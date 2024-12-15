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

const validatePostUser = [
  body('email').trim().isEmail().withMessage('Invalid email formatting'),
  body('username')
    .trim()
    .isLength({min: 3, max: 20})
    .withMessage('Username must be between 3 and 20 characters')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric'),
  body('password')
    .trim()
    .isLength({min: 8})
    .withMessage("Password can't be shorter than 8 characters"),
];

const validateId = [body('id').isNumeric().withMessage('ID must be a number')];

const validatePutUser = [
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email formatting'),
  body('username')
    .optional()
    .trim()
    .isLength({min: 3, max: 20})
    .withMessage('Username must be between 3 and 20 characters')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric'),
];

// Route: /api/user
userRouter
  .route('/')
  .get(getUsers)
  .post(validatePostUser, validationErrorHandler, postUser)
  .put(authenticateToken, validatePutUser, validationErrorHandler, putUser);

// Route: /api/user/:id
userRouter
  .route('/:id')
  .get(validateId, validationErrorHandler, getUserById)
  .put(putUserParams)
  .delete(authenticateToken, validateId, validationErrorHandler, DeleteUser);

export default userRouter;
