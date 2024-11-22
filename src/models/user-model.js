import promisePool from '../utils/database.js';

// Fetch user by username
const fetchUserName = async (username) => {
  try {
    const sql = `SELECT 1 FROM Users WHERE username = ? LIMIT 1`;
    const params = [username];
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (err) {
    console.error('fetchUserName', err.message);
    throw new Error('Database error: ' + err.message);
  }
};

// Fetch all users from database and pass it to controller
const fetchUsers = async () => {
  try {
    const sql = 'SELECT * FROM Users';
    const [rows] = await promisePool.query(sql);
    return rows;
  } catch (err) {
    console.error('fetchUsers', err.message);
    throw new Error('Database error: ' + err.message);
  }
};

// Create new user to database
// Returns new users id
const createUser = async (newUser) => {
  const sql = `INSERT INTO Users (username, password, email, user_level_id, created_at) 
    VALUES (?, ?, ?, ?, ?)`;
  const params = [
    newUser.username,
    newUser.password,
    newUser.email,
    newUser.user_level_id,
  ];
  try {
    const result = await promisePool.query(sql, params);
    // console.log('addUser', result, newUser);
    // console.log(typeof result[0].insertId);
    return result[0].insertId;
  } catch (err) {
    console.error('createUser', err.message);
    throw new Error('Database error: ' + err.message);
  }
};

export {fetchUsers, createUser, fetchUserName};
