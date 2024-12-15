import express from 'express';
import multer from 'multer';
import {
  deleteMedia,
  getItemById,
  getItems,
  postItem,
  putItem,
} from '../controllers/media-controller.js';
import {body} from 'express-validator';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrorHandler} from '../middlewares/error-handler.js';

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

const validatePostItem = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),
  body('description')
    .notEmpty()
    .withMessage('description is required')
    .isString()
    .withMessage('description must be a string'),
];

const validateIdParam = [
  body('id')
    .notEmpty()
    .withMessage('id is required')
    .isNumeric()
    .withMessage('id must be a number'),
];

const validatePutItem = [
  ...validateIdParam,
  body('title').optional().isString().withMessage('Title must be a string'),
  body('description')
    .optional()
    .isString()
    .withMessage('description must be a string'),
];

// Index.js määrittelee routterin käyttämään jo /api/media
// Joten allaoleva polku on --> /api/media/ (juuri)
mediaRouter
  .route('/')
  .get(getItems)
  .post(
    authenticateToken,
    validatePostItem,
    validationErrorHandler,
    upload.single('file'),
    postItem,
  );

// Route: /api/media/:id
mediaRouter
  .route('/:id')
  .get(validateIdParam, validationErrorHandler, getItemById)
  .put(authenticateToken, validatePutItem, validationErrorHandler, putItem)
  .delete(
    authenticateToken,
    validateIdParam,
    validationErrorHandler,
    deleteMedia,
  );

export default mediaRouter;
