import fs from 'fs';
import {
  fetchMediaItems,
  addMediaItem,
  fetchMediaItemById,
  updateMediaItem,
  deleteMediaItem,
} from '../models/media-model.js';
import {customError} from '../middlewares/error-handler.js';

const getItems = async (req, res, next) => {
  try {
    res.json(await fetchMediaItems());
  } catch (e) {
    next(customError('Something went wrong: ' + e.message, 503));
  }
};

const getItemById = async (req, res, next) => {
  const id = parseInt(req.params.id);
  console.log('getItemById', id);
  try {
    const item = await fetchMediaItemById(id);
    if (!item) {
      return next(customError('Item not found', 404));
    }
    res.json(item);
  } catch (error) {
    console.error('getItemById', error.message);
    next(customError(error.message, 503));
  }
};

/**
 * Add media controller function for handling POST request and sending response
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @returns {object} response object
 */
const postItem = async (req, res, next) => {
  // destructure title and description property values from req.body
  const {title, description} = req.body;
  // quick and dirty validation example, better input validatation is added later
  if (!title || !description || !req.file) {
    return next(customError('Title, description and file are required', 400));
  }
  console.log('post req body', req.body);
  console.log('post req file', req.file);
  const newMediaItem = {
    // User added from token added by auth middleware
    user_id: req.user.user_id,
    title,
    description,
    filename: req.file.filename,
    filesize: req.file.size,
    media_type: req.file.mimetype,
    created_at: new Date().toISOString(),
  };
  try {
    const id = await addMediaItem(newMediaItem);
    res.status(201).json({message: 'Item added', id: id});
  } catch (error) {
    next(customError('Something went wrong: ' + error.message, 503));
  }
};

/**
 * Update media file Controller function for handling PUT request and sending response
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @returns {object} response object
 */

const putItem = async (req, res, next) => {
  // destructure title and description property values from req.body
  const {title, description} = req.body;
  console.log('put req body', req.body);
  const newDetails = {
    title,
    description,
  };
  try {
    const itemsEdited = await updateMediaItem(
      req.params.id,
      req.user.user_id,
      newDetails,
    );
    // if no items were edited (id was not found in DB), return 404
    // 403 if no permission to edit
    if (itemsEdited === 0) {
      return next(customError('Item not found or no permission to edit', 404));
    }
    res.status(200).json({message: 'Item updated', id: req.params.id});
  } catch (error) {
    next(customError('Something went wrong: ' + error.message, 503));
  }
};

const deleteMedia = async (req, res, next) => {
  try {
    const result = await deleteMediaItem(req.params.id, req.user.user_id);

    if (!result) {
      return next(
        customError('Item not found or no permission to delete', 404),
      );
    }

    // console.log(result.result);
    // Luodaan polku mistä tiedosto poistetaan
    const filePath = './uploads/' + result.filename;
    // console.log(filePath);

    // Voisi parantaa vielä logiikkaa että haetaan tiedosto tietokannasta
    // ja sen perusteella ensin poistetaan tiedostoista ja vasta senjälkeen tietokannasta´

    // Varmistetaan että tiedosto löytyy
    if (fs.existsSync(filePath)) {
      // Poistetaan tiedosto
      fs.unlink(filePath, (err) => {
        if (err) {
          return next(customError('File not found', 404));
        }
      });
    }
    res
      .status(result.status)
      .json({message: result.message, mediaId: result.mediaId});
  } catch (error) {
    next(customError('Something went wrong: ' + error.message, 500));
  }
};

export {getItems, getItemById, postItem, putItem, deleteMedia};
