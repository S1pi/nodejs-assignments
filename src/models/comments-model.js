import promisePool from '../utils/database.js';

const addComments = async (newComment) => {
  const sql = `INSERT INTO Comments
                  (media_id, user_id, comment_text)
                  VALUES (?, ?, ?)`;
  const params = [
    newComment.mediaId,
    newComment.userId,
    newComment.commentText,
  ];
  try {
    const result = await promisePool.query(sql, params);
    // console.log(result);
    return result[0].insertId;
  } catch (err) {
    console.error('addComments: ', err.message);
    throw new Error('Database error ' + err.message);
  }
};

const fetchCommentsByMedia = async (id) => {
  const sql = `SELECT * FROM Comments WHERE media_id = ?`;
  const params = [id];
  try {
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (err) {
    console.error('Database error: ' + err.message);
    throw new Error('Database Error', err.message);
  }
};

const fetchCommentsByUser = async (id) => {
  const sql = `SELECT * FROM Comments WHERE user_id = ?`;
  const params = [id];
  try {
    const [rows] = await promisePool.query(sql, params);
    return rows;
  } catch (err) {
    console.error('Database error: ' + err.message);
    throw new Error('Database Error', err.message);
  }
};

const deleteOneComment = async (id) => {
  const sql = `DELETE FROM Comments WHERE comment_id = ?`;
  try {
    const [result] = await promisePool.query(sql, [id]);
    return result.affectedRows;
  } catch (err) {
    console.error('DB Error: ', err.message);
    throw new Error('Database Error', err.message);
  }
};

const deleteAllComments = async (id) => {
  const sql = `DELETE FROM Comments WHERE media_id = ?`;
  try {
    const [result] = await promisePool.query(sql, [id]);
    return result.affectedRows;
  } catch (err) {
    console.error('DB Error: ', err.message);
    throw new Error('Database Error', err.message);
  }
};

export {
  addComments,
  fetchCommentsByMedia,
  fetchCommentsByUser,
  deleteOneComment,
  deleteAllComments,
};
