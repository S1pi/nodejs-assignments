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
app.use('/uploads', express.static('uploads'));

// Api documentation page rendered with pug
app.get('/api', (req, res) => {
  res.render('index', {
    title: 'Media sharing REST API Documentation',
    version: process.env.npm_package_version,
    // exampleData: mediaItems,
  });
});

// Media resource endpoints
app.use('/api/media', mediaRouter);
// User resource endpoints
app.use('/api/user', userRouter);
// Comments resource endpoints TODO commentsRouter
app.use('/api/comments', commentsRouter);

app.use('/api/auth', authRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
