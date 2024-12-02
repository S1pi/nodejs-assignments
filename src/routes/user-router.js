import express from 'express';
import {
  DeleteUser,
  getUserById,
  getUsers,
  postUser,
  putUser,
  putUserParams,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const userRouter = express.Router();

// Route: /api/user
userRouter
  .route('/')
  .get(getUsers)
  .post(postUser)
  .put(authenticateToken, putUser);

// Route: /api/user/:id
userRouter.route('/:id').get(getUserById).put(putUserParams).delete(DeleteUser);

export default userRouter;
