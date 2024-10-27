import http from 'http';
import {
  getcharacters,
  postCharacter,
  deleteCharacter,
  modifyCharacter,
} from './items.js';
const hostname = '127.0.0.1';
const port = 3000;

// Create a server object and bind a callback function
// to all request events
const server = http.createServer((req, res) => {
  const {url, method} = req;

  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const urlParts = parsedUrl.pathname.split('/');
  // console.log(parts);
  const character = urlParts[2];
  const dw = urlParts[1];
  // console.log(character);
  console.log(dw);

  console.log('url:', url, 'method:', method);
  if (url === '/characters' && method === 'GET') {
    getcharacters(res);
  } else if (url === '/character' && method === 'POST') {
    postCharacter(req, res);
  } else if (urlParts[1] === 'delete' && method === 'DELETE') {
    deleteCharacter(res, character);
  } else if (urlParts[1] === 'modify' && method === 'PUT') {
    modifyCharacter(req, res, character);
  } else {
    // Generic not found response
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({error: '404', message: 'not found'}));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
