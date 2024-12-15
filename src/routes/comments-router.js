import express from 'express';
import {
  deleteAllMediaComments,
  deleteCommentsByid,
  getCommentsByMedia,
  getCommentsByUser,
  postComments,
} from '../controllers/comments-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrorHandler} from '../middlewares/error-handler.js';
import {param, body} from 'express-validator';

const commentsRouter = express.Router();

const validatePostComments = [
  body('mediaId')
    .notEmpty()
    .withMessage('mediaId is required')
    .isNumeric()
    .withMessage('mediaId must be a number'),
  body('commentText')
    .notEmpty()
    .withMessage('commentText is required')
    .isString()
    .withMessage('commentText must be a string'),
];

const validateIdParam = [
  param('id')
    .notEmpty()
    .withMessage('id is required')
    .isNumeric()
    .withMessage('id must be a number'),
];

// Route: /api/comments
commentsRouter
  .route('/')
  .post(
    authenticateToken,
    validatePostComments,
    validationErrorHandler,
    postComments,
  );
// Can delete comments only if comment belongs to user
commentsRouter
  .route('/:id')
  .delete(
    authenticateToken,
    validateIdParam,
    validationErrorHandler,
    deleteCommentsByid,
  );
commentsRouter
  .route('/media/:id')
  .get(validateIdParam, validationErrorHandler, getCommentsByMedia)
  .delete(validateIdParam, validationErrorHandler, deleteAllMediaComments);
commentsRouter
  .route('/user/:id')
  .get(validateIdParam, validationErrorHandler, getCommentsByUser);

export default commentsRouter;
