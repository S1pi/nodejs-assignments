import express from 'express';
import {getItemById, getItems, mediaItems, postItem} from './media.js';
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

// Api documentation page rendered with pug
app.get('/api', (req, res) => {
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

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
