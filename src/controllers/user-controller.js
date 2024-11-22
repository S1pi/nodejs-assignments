import {fetchUsers, createUser, fetchUserName} from '../models/user-model.js';

const usernameAvailable = async (username) => {
  const usernameRows = await fetchUserName(username);
  if (usernameRows.length > 0) {
    return false;
  } else return true;
};

// Get users from user-model and give them as response
const getUsers = async (req, res) => {
  try {
    res.json(await fetchUsers());
  } catch (err) {
    console.error('getUsers', err.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

const postUser = async (req, res) => {
  const newUser = req.body;
  const username = req.body.username;
  if (!username || !req.body.password) {
    return res.status(400).json({message: 'Username and Password is required'});
  }
  if (await usernameAvailable(username)) {
    try {
      // TODO: user creation
      // res.json(await createUser(newUser));
      res.status(200).json({message: 'Username: ' + username + ' available'});
    } catch (err) {
      console.error('postUser', err.message);
      res.status(503).json({error: 503, message: 'DB error'});
    }
  } else {
    return res.status(400).json({message: 'Username is taken'});
  }
};

export {getUsers, postUser};
