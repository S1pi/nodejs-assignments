import express from 'express';
import {body} from 'express-validator';
import {
  DeleteUser,
  getUserById,
  getUsers,
  postUser,
  putUser,
  putUserParams,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const userRouter = express.Router();

// Route: /api/user
userRouter
  .route('/')
  .get(getUsers)
  .post(
    body('email').trim().isEmail(),
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8}),
    validationErrorHandler,
    postUser,
  )
  .put(authenticateToken, putUser);

// Route: /api/user/:id
userRouter.route('/:id').get(getUserById).put(putUserParams).delete(DeleteUser);

export default userRouter;
