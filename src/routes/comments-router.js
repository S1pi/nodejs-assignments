import express from 'express';
import {
  deleteAllMediaComments,
  deleteCommentsByid,
  getCommentsByMedia,
  getCommentsByUser,
  postComments,
} from '../controllers/comments-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const commentsRouter = express.Router();

// Route: /api/comments
commentsRouter.route('/').post(authenticateToken, postComments);
// Can delete comments only if comment belongs to user
commentsRouter.route('/:id').delete(authenticateToken, deleteCommentsByid);
commentsRouter
  .route('/media/:id')
  .get(getCommentsByMedia)
  .delete(deleteAllMediaComments);
commentsRouter.route('/user/:id').get(getCommentsByUser);

export default commentsRouter;
