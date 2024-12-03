import express from 'express';
import mediaRouter from './routes/media-router.js';
import userRouter from './routes/user-router.js';
import commentsRouter from './routes/comments-router.js';
import authRouter from './routes/auth-router.js';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());

// Home page (client) as static html, css, js
app.use(express.static('public'));
// Uploaded media files
app.use('/media', express.static('media'));
app.use('/uploads', express.static('uploads'));

app.put('/api/media/:id', (req, res) => {
  // TODO: implement this endpoint
  res.status(501).json({message: 'Under construction'});
});
app.use('/api/media', mediaRouter);
// User resource endpoints
app.use('/api/user', userRouter);
// Comments resource endpoints TODO commentsRouter
app.use('/api/comments', commentsRouter);

app.use('/api/auth', authRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
