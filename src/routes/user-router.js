import express from 'express';
import {getUsers, postUser} from '../controllers/user-controller.js';

const userRouter = express.Router();

// Route: /api/user
userRouter.route('/').get(getUsers).post(postUser);
// userRouter.route('/').get(getUsers);

// Route: /api/user/:id
// userRouter.route('/:id').get(getUserById).put(modifyUser).delete(deleteUser);

export default userRouter;
