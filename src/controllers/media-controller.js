import fs from 'fs';
import {
  fetchMediaItems,
  addMediaItem,
  fetchMediaItemById,
  updateMediaItem,
  deleteMediaItem,
} from '../models/media-model.js';

const getItems = async (req, res) => {
  try {
    res.json(await fetchMediaItems());
  } catch (e) {
    console.error('getItems', e.message);
    res.status(503).json({error: 503, message: 'DB error'});
  }
};

const getItemById = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log('getItemById', id);
  try {
    const item = await fetchMediaItemById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({message: 'Item not found'});
    }
  } catch (error) {
    console.error('getItemById', error.message);
    res.status(503).json({error: 503, message: error.message});
  }
};

/**
 * Add media controller function for handling POST request and sending response
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @returns {object} response object
 */
const postItem = async (req, res) => {
  // destructure title and description property values from req.body
  const {title, description} = req.body;
  // quick and dirty validation example, better input validatation is added later
  if (!title || !description || !req.file) {
    return res
      .status(400)
      .json({message: 'Title, description and file required'});
  }
  console.log('post req body', req.body);
  console.log('post req file', req.file);
  const newMediaItem = {
    // user id is hardcoded for now
    user_id: 1,
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
    return res
      .status(503)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

/**
 * Update media file Controller function for handling PUT request and sending response
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @returns {object} response object
 */
const putItem = async (req, res) => {
  // destructure title and description property values from req.body
  const {title, description} = req.body;
  console.log('put req body', req.body);
  const newDetails = {
    title,
    description,
  };
  try {
    const itemsEdited = await updateMediaItem(req.params.id, newDetails);
    // if no items were edited (id was not found in DB), return 404
    if (itemsEdited === 0) {
      return res.status(404).json({message: 'Item not found'});
    } else if (itemsEdited === 1) {
      return res.status(200).json({message: 'Item updated', id: req.params.id});
    }
  } catch (error) {
    return res
      .status(500)
      .json({message: 'Something went wrong: ' + error.message});
  }
};

const deleteMedia = async (req, res) => {
  const result = await deleteMediaItem(req.params.id);
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
        return res
          .status(500)
          .json({message: 'Error deleting mediafile', error: err});
      }
    });
  }
  res
    .status(result.status)
    .json({message: result.message, mediaId: result.mediaId});
};

export {getItems, getItemById, postItem, putItem, deleteMedia};
