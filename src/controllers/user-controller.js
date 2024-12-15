import {customError} from '../middlewares/error-handler.js';
import {
  fetchUsers,
  createUser,
  fetchUserName,
  fetchUserById,
  changeUserData,
  deleteUser,
} from '../models/user-model.js';

// Cheks if username is taken or not
// Returns true or false
const usernameAvailable = async (username) => {
  const usernameRows = await fetchUserName(username);
  if (usernameRows.length > 0) {
    return false;
  } else return true;
};

// Get users from user-model and give them as response
const getUsers = async (req, res, next) => {
  try {
    res.status(200).json(await fetchUsers());
  } catch (err) {
    next(
      customError('Database error: ' + err.message, 503, [
        {message: err.message},
      ]),
    );
  }
};

// eslint-disable-next-line no-unused-vars
const postUser = async (req, res, next) => {
  console.log('Tuli postUseriin');

  const newUser = req.body;
  const username = req.body.username;

  // If username is available calls user-model to create it on database
  try {
    if (!(await usernameAvailable(username))) {
      return next(customError('Username is taken', 400));
    }

    const user = await createUser(newUser);
    res
      .status(201)
      .json({message: `User: ${username} created successfully`, id: user});
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return next(customError('Email is already taken', 400));
    }
    next(customError('Database error', 503, [{message: err.message}]));
  }
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await fetchUserById(id);
    if (user.status === 404) {
      res.status(404).json(user);
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    next(
      customError('Database error: ' + err.message, 503, [
        {message: err.message},
      ]),
    );
  }
};

const putUser = async (req, res, next) => {
  // Takes own user id from authorization
  const id = req.user.user_id;
  const newData = req.body;
  try {
    const user = await changeUserData(id, newData);
    // Updates userdata on database but not to JWT token so need to implement something for that
    res.status(200).json({
      message: 'User updated succesfully',
      updatedUser: user.updatedUser,
      info: user.result.info,
    });
  } catch (err) {
    console.error('putUser', err.message);
    next(customError('Database error', 503, [{message: err.message}]));
  }
};

// Takes user id from params version
const putUserParams = async (req, res) => {
  const id = req.params.user_id;
  const newData = req.body;
  try {
    const user = await changeUserData(id, newData);
    // console.log(user.result.info);
    res.status(200).json({
      message: 'User updated succesfully',
      updatedUser: user.updatedUser,
      info: user.result.info,
    });
  } catch (err) {
    console.error('putUser', err.message);
    res.status(503).json({message: 'DB error', error: 503});
  }
};

const DeleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await deleteUser(id);
    if (result.affectedRows === 0) {
      return next(customError(`User with ID ${id} not found`, 404));
    }
    res.status(200).json({message: 'User deleted successfully'});
  } catch (err) {
    next(customError('Database error', 503, [{message: err.message}]));
  }
};

export {getUsers, postUser, getUserById, putUser, putUserParams, DeleteUser};
