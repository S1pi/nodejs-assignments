import express from 'express';
import multer from 'multer';
import {
  getItemById,
  getItems,
  postItem,
  putItem,
} from '../controllers/media-controller.js';

const upload = multer({dest: 'uploads/'});

const mediaRouter = express.Router();

// Index.js määrittelee routterin käyttämään jo /api/media
// Joten allaoleva polku on --> /api/media/ (juuri)
mediaRouter.route('/').get(getItems).post(upload.single('file'), postItem);

// Route: /api/media/:id
// mediaRouter.route('/:id').get(getItemById).put(putItem).delete(deleteMedia);

export default mediaRouter;
