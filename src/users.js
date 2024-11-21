// Mockdata
const users = [
  {
    user_id: 260,
    username: 'VCHar',
    password: '********',
    email: 'vchar@example.com',
    user_level_id: 1,
    created_at: '2020-09-12T06:56:41.000Z',
  },
  {
    user_id: 305,
    username: 'Donatello',
    password: '********',
    email: 'dona@example.com',
    user_level_id: 1,
    created_at: '2021-12-11T06:00:41.000Z',
  },
  {
    user_id: 3609,
    username: 'Anon5468',
    password: '********',
    email: 'x58df@example.com',
    user_level_id: 3,
    created_at: '2023-04-02T05:56:41.000Z',
  },
];

// Get all users
const getUsers = (res) => {
  res.status(200).json(users);
};

// Get user by id
const getUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((usr) => usr.user_id === userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({message: `UserId: ${userId} not found`});
  }
};

// Create new user
const createUser = (req, res) => {
  try {
    const body = req.body;
    console.log('post req body', req.body);
    users.push(body);
    res.status(200).json({message: 'User created succesfully', user: body});
  } catch (err) {
    res.status(404).json({message: `Error occured creating user: ${err}`});
  }
};

// Modify existing user
const modifyUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const newData = req.body;
  const userIndex = users.findIndex((user) => user.user_id === userId);
  if (userIndex !== -1) {
    users[userIndex] = {...users[userIndex], ...newData};
    res.status(200).json({
      message: 'User data updated succesfully!',
      updatedUser: users[userIndex],
    });
  } else {
    res.status(404).json({message: `User id: ${userId} not found`});
  }
};

// Delete user

const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.user_id === userId);
  if (userIndex !== -1) {
    const user = users[userIndex];
    users.splice(userIndex, 1);
    res.status(200).json({
      message: 'User deleted succesfully!',
      deletedUser: user,
    });
  } else {
    res.status(404).json({message: `User id: ${userId} not found`});
  }
};

export {getUser, createUser, modifyUser, deleteUser, getUsers};
