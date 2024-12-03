import express from 'express';
<<<<<<< HEAD
import {getItemById, getItems, mediaItems, postItem} from './media.js';
=======
import mediaRouter from './routes/media-router.js';
import userRouter from './routes/user-router.js';
import commentsRouter from './routes/comments-router.js';
import authRouter from './routes/auth-router.js';
>>>>>>> 3b6b6cc577253facc05eaca7a0e60e080596d8e9
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());

// Home page (client) as static html, css, js
app.use(express.static('public'));
// Uploaded media files
<<<<<<< HEAD
app.use('/media', express.static('media'));
=======
app.use('/uploads', express.static('uploads'));
>>>>>>> 3b6b6cc577253facc05eaca7a0e60e080596d8e9

// Api documentation page rendered with pug
app.get('/api', (req, res) => {
  res.render('index', {
    title: 'Media sharing REST API Documentation',
    version: process.env.npm_package_version,
<<<<<<< HEAD
    exampleData: mediaItems,
=======
    // exampleData: mediaItems,
>>>>>>> 3b6b6cc577253facc05eaca7a0e60e080596d8e9
  });
});

// Media resource endpoints
<<<<<<< HEAD
app.get('/api/media', (req, res) => {
  getItems(res);
});

app.get('/api/media/:id', (req, res) => {
  //console.log('req.params', req.params);
  //console.log('query params', req.query);
  getItemById(req, res);
});

app.post('/api/media', (req, res) => {
  postItem(req, res);
});
app.put('/api/media/:id', (req, res) => {
  // TODO: implement this endpoint
  res.status(501).json({message: 'Under construction'});
});
=======
app.use('/api/media', mediaRouter);
// User resource endpoints
app.use('/api/user', userRouter);
// Comments resource endpoints TODO commentsRouter
app.use('/api/comments', commentsRouter);

app.use('/api/auth', authRouter);
>>>>>>> 3b6b6cc577253facc05eaca7a0e60e080596d8e9

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
