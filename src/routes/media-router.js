import express from 'express';
import multer from 'multer';
import {
  deleteMedia,
  getItemById,
  getItems,
  postItem,
  putItem,
} from '../controllers/media-controller.js';

// Luodaan storagen sijainti sekä määritetään käyttämään omaa filenimeä
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Matin opetettu versio
// const upload = multer({dest: 'uploads/'});

const upload = multer({storage: storage});

const mediaRouter = express.Router();

// Index.js määrittelee routterin käyttämään jo /api/media
// Joten allaoleva polku on --> /api/media/ (juuri)
mediaRouter.route('/').get(getItems).post(upload.single('file'), postItem);

// Route: /api/media/:id
mediaRouter.route('/:id').get(getItemById).put(putItem).delete(deleteMedia);

export default mediaRouter;
