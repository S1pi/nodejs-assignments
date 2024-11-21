import express from 'express';
import {
  deleteMedia,
  getItemById,
  getItems,
  mediaItems,
  modifyMediaItem,
  postItem,
} from './media.js';
import {
  createUser,
  getUser,
  modifyUser,
  deleteUser,
  getUsers,
} from './users.js';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.set('view engine', 'pug');
app.set('views', 'src/views');

app.use(express.json());

// Home page (client) as static html, css, js
// app.use(express.static('public'));
// Uploaded media files
app.use('/media', express.static('media'));

// Api documentation page rendered with pug
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Media sharing REST API Documentation',
    version: process.env.npm_package_version,
    exampleData: mediaItems,
  });
});

// Media resource endpoints
app.get('/api/media', (req, res) => {
  getItems(res);
});

// Get media by id
app.get('/api/media/:id', (req, res) => {
  //console.log('req.params', req.params);
  //console.log('query params', req.query);
  getItemById(req, res);
});

// Add new item
app.post('/api/media', (req, res) => {
  postItem(req, res);
});

// Modify existing mediaitem
app.put('/api/media/:id', (req, res) => {
  modifyMediaItem(req, res);
});

// Delete mediaitem
app.delete('/api/media/:id', (req, res) => {
  deleteMedia(req, res);
});

// Get all users
app.get('/api/user', (req, res) => {
  getUsers(res);
});

// Get user by id
app.get('/api/user/:id', (req, res) => {
  getUser(req, res);
});

// Add user
app.post('/api/user', (req, res) => {
  // Fetch user
  createUser(req, res);
  // res.status(501).json({message: 'Under construction'});
});

// Modify user
app.put('/api/user/:id', (req, res) => {
  modifyUser(req, res);
});

// Delete user
app.delete('/api/user/:id', (req, res) => {
  deleteUser(req, res);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
