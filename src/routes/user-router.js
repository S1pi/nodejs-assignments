import express from 'express';
import {
  DeleteUser,
  getUserById,
  getUsers,
  postUser,
  putUser,
} from '../controllers/user-controller.js';

const userRouter = express.Router();

// Route: /api/user
userRouter.route('/').get(getUsers).post(postUser);

// Route: /api/user/:id
userRouter.route('/:id').get(getUserById).put(putUser).delete(DeleteUser);

export default userRouter;
