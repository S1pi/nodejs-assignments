import express from 'express';
import {
  deleteAllMediaComments,
  deleteCommentsByid,
  getCommentsByMedia,
  getCommentsByUser,
  postComments,
} from '../controllers/comments-controller.js';

const commentsRouter = express.Router();

// Route: /api/comments
commentsRouter.route('/').post(postComments);
commentsRouter.route('/:id').delete(deleteCommentsByid);
commentsRouter
  .route('/media/:id')
  .get(getCommentsByMedia)
  .delete(deleteAllMediaComments);
commentsRouter.route('/user/:id').get(getCommentsByUser);

export default commentsRouter;
