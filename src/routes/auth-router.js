import express from 'express';
import {getMe, postLogin} from '../controllers/auth-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrorHandler} from '../middlewares/error-handler.js';
import {body} from 'express-validator';

const authRouter = express.Router();

const loginValidation = [
  body('username').isString().notEmpty(),
  body('password').isString().notEmpty(),
];

authRouter
  .route('/login')
  .post(loginValidation, validationErrorHandler, postLogin);

authRouter.route('/me').get(authenticateToken, getMe);

export default authRouter;
