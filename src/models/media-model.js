import promisePool from '../utils/database.js';

/**
 * Fetch all media items from the database
 * TODO: limit the number of items returned based on query parameter?
 * @returns {Promise<Array>} array of media items
 */
const fetchMediaItems = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM MediaItems');
    return rows;
  } catch (e) {
    console.error('fetchMediaItems', e.message);
    throw new Error('Database error ' + e.message);
  }
};

/**
 * Fetch a media item from the database based on id
 * @param {number} id media item id
 * @returns {Promise<object>} media item details
 */
const fetchMediaItemById = async (id) => {
  try {
    const sql = 'SELECT * FROM MediaItems WHERE media_id = ?';
    const [rows] = await promisePool.query(sql, [id]);
    // console.log('fetchMediaItemById', rows);
    return rows[0];
  } catch (e) {
    console.error('fetchMediaItemById', e.message);
    throw new Error('Database error ' + e.message);
  }
};

/**
 * Add a new media item to the database
 * @param {object} newItem media file details
 * @returns {Promise<number>} id of the new item
 */
const addMediaItem = async (newItem) => {
  const sql = `INSERT INTO MediaItems
                (user_id, title, description, filename, filesize, media_type)
                VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    newItem.user_id,
    newItem.title,
    newItem.description,
    newItem.filename,
    newItem.filesize,
    newItem.media_type,
  ];
  try {
    const result = await promisePool.query(sql, params);
    // console.log('addMediaItem', result, newItem);
    return result[0].insertId;
  } catch (error) {
    console.error('addMediaItem', error.message);
    throw new Error('Database error ' + error.message);
  }
};

/**
 * Update a media item in the database
 * @param {number} id
 * @param {object} updatedItem
 * @returns {Promise<number>} number of affected rows
 */
const updateMediaItem = async (id, userID, updatedItem) => {
  const sql = `UPDATE MediaItems SET title = ?, description = ? WHERE media_id = ? AND user_id = ?`;
  const params = [updatedItem.title, updatedItem.description, id, userID];
  try {
    const result = await promisePool.query(sql, params);
    console.log('updateMediaItem', result);
    return result[0].affectedRows;
  } catch (error) {
    console.error('updateMediaItem', error.message);
    throw new Error('Database error ' + error.message);
  }
};

const deleteMediaItem = async (id, userID) => {
  const sql = 'DELETE FROM MediaItems WHERE media_id = ? AND user_id = ?';
  const params = [id, userID];
  const mediaItem = await fetchMediaItemById(id);
  console.log(mediaItem);

  if (!mediaItem) {
    console.log('Meni');
    return {status: 404, message: 'Media Item not found', mediaId: id};
  } else {
    const [rows] = await promisePool.query(sql, params);
    if (rows.affectedRows > 0) {
      return {
        status: 200,
        message: `Media item: ${mediaItem.filename} deleted succesfully`,
        result: rows,
        filename: mediaItem.filename,
      };
    } else {
      return {
        status: 403,
        message: `Not authorization to delete this item`,
        result: rows,
        filename: mediaItem.filename,
      };
    }
  }
};

export {
  fetchMediaItems,
  fetchMediaItemById,
  addMediaItem,
  updateMediaItem,
  deleteMediaItem,
};
