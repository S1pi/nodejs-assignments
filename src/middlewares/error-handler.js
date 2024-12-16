import {validationResult} from 'express-validator';

/**
 * Custom error generator
 * @param {string} message - error message
 * @param {number} [status] - optional error status, default is 500
 * @param {array} [errors] - optional array of error objects (used e.g. for validation errors)
 * @returns {object} error object
 */
const customError = (message, status, errors) => {
  const error = new Error(message);
  error.status = status || 500;
  if (errors) {
    error.errors = errors;
  }
  return error;
};

/**
 * Custom middleware for handling and formatting validation errors
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const validationErrorHandler = (req, res, next) => {
  // validation errors can be retrieved from the request object (added by express-validator middleware)
  //const errors = validationResult(req);
  const errors = validationResult(req, {strictParams: ['body']});
  // check if any validation errors
  if (!errors.isEmpty()) {
    // console.log('validation errors', errors.array({onlyFirstError: true}));
    // extract field names & messages from error array (only one error per field)
    const validationErrors = errors
      .array({onlyFirstError: true})
      .map((error) => {
        return {field: error.path, msg: error.msg};
      });
    return next(customError('Invalid input data', 400, validationErrors));
  }
  next();
};

/**
 * Generic 404 error handler
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function
 */
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error); // forward error to error handler
};

/**
 * Custom default middleware for handling errors
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500); // default is 500 if err.status is not defined
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
      errors: err.errors,
    },
  });
};

export {notFoundHandler, errorHandler, customError, validationErrorHandler};
