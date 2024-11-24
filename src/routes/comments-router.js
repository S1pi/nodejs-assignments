import express from 'express';
import {postComments} from '../controllers/comments-controller.js';

const commentsRouter = express.Router();

// Route: /api/comments
commentsRouter.route('/').post(postComments);

// commentsRouter.route("/media/:id").get().delete()
// commentsRouter.route("/user/:id").get()
// commentsRouter.route('/media/:user-id/:media-id').get().delete();

export default commentsRouter;
