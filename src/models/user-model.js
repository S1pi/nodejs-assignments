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

/**
 * Creates a new user in the database
 *
 * @param {object} newUser data
 * @returns {number} - id of the inserted use in db
 */

const createUser = async (newUser) => {
  const sql = `INSERT INTO Users 
                (username, password, email, user_level_id) 
                VALUES (?, ?, ?, ?)`;
  // Hardcoded userlevel
  const params = [newUser.username, newUser.password, newUser.email, 2];
  try {
    const result = await promisePool.query(sql, params);
    return result[0].insertId;
  } catch (err) {
    console.error('createUser', err.message);
    throw err;
  }
};

const fetchUserById = async (id) => {
  const sql = 'SELECT * FROM Users WHERE user_id = ?';
  const params = [id];
  try {
    const [rows] = await promisePool.query(sql, params);
    // console.log(rows);
    if (rows.length === 0) {
      console.log('User not found');
      return {status: 404, message: 'User not found', userId: id};
    }
    return rows[0];
  } catch (err) {
    console.error('fetchUserById', err.message);
    throw new Error('Database error' + err.message);
  }
};

const changeUserData = async (id, updatedData) => {
  const fields = Object.keys(updatedData)
    .map((field) => `${field} = ?`)
    .join(',');
  const values = Object.values(updatedData);
  const sql = `UPDATE Users SET ${fields} WHERE user_id = ?`;
  const params = [...values, id];
  try {
    const [rows] = await promisePool.query(sql, params);
    const updatedUser = await fetchUserById(id);
    return {updatedUser: updatedUser, result: rows};
  } catch (err) {
    console.error('changeUserData', err.message);
    throw new Error('Database error' + err.message);
  }
};

const deleteUser = async (id) => {
  const sql = 'DELETE FROM Users WHERE user_id = ?';
  const params = [id];
  try {
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (err) {
    console.error('deleteUser', err.message);
    throw new Error('Database error', err.message);
  }
};

const selectUserByUsernameAndPassword = async (user) => {
  try {
    const sql =
      'SELECT user_id, username, email, user_level_id FROM Users WHERE username = ? AND password = ?';
    const params = [user.username, user.password];
    const [rows] = await promisePool.execute(sql, params);
    return rows[0];
  } catch (err) {
    console.error(err);
  }
};

export {
  fetchUsers,
  createUser,
  fetchUserName,
  fetchUserById,
  changeUserData,
  deleteUser,
  selectUserByUsernameAndPassword,
};
