import {fetchUsers, createUser, fetchUserName} from '../models/user-model.js';

// Cheks if username is taken or not
// Returns true or false
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
  // If username is available calls user-model to create it on database
  if (await usernameAvailable(username)) {
    try {
      const user = await createUser(newUser);
      res
        .status(201)
        .json({message: `User: ${username} created succesfully`, id: user});
      // res.status(200).json({message: 'Username: ' + username + ' available'});
    } catch (err) {
      // Käsitellään errori jos sähköposti on jo käytössä ja annetaan se eteenpäin käyttäjälle
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({error: 'Email is already taken'});
      }
      console.error('postUser', err.message);
      res.status(503).json({error: 503, message: 'DB error'});
    }
  } else {
    return res.status(400).json({message: 'Username is taken'});
  }
};

export {getUsers, postUser};
