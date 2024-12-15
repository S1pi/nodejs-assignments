import {customError} from '../middlewares/error-handler.js';
import {
  addComments,
  deleteAllComments,
  deleteOneComment,
  fetchCommentsByMedia,
  fetchCommentsByUser,
} from '../models/comments-model.js';
// Post comments for media
const postComments = async (req, res, next) => {
  const {mediaId, commentText} = req.body;
  // userId is taken from token
  const userId = req.user.user_id;

  if (!mediaId || !userId || !commentText) {
    throw customError(
      "mediaId, userId and commentText can't be null or empty",
      400,
    );
  }

  const newComment = {mediaId, userId, commentText};
  try {
    const commentID = await addComments(newComment);
    res.status(201).json({
      message: 'New comment created',
      status: 201,
      comment_id: commentID,
    });
  } catch (err) {
    console.error('postComments ', err.message);
    next(err);
  }
};

// Get all comments from media
const getCommentsByMedia = async (req, res) => {
  const id = req.params.id;
  try {
    const allComments = await fetchCommentsByMedia(id);
    if (allComments.length === 0) {
      res.status(404).json({
        status: 404,
        message: 'Comments not found by media_id',
        mediaId: id,
      });
    } else {
      res.status(200).json({mediaId: id, comments: allComments});
    }
  } catch (err) {
    console.log('DB Error: ', err.message);
    res.status(503).json({
      status: 503,
      message: 'Something went wrong: DB Error',
      error: err,
    });
  }
};
// Get all comments made by user
const getCommentsByUser = async (req, res) => {
  const userId = req.params.id;
  const allComments = await fetchCommentsByUser(userId);
  try {
    if (allComments.length === 0) {
      res.status(404).json({
        status: 404,
        message: 'Comments not found by user_id',
        user_id: userId,
      });
    } else {
      res.status(200).json({userId: userId, comments: allComments});
    }
  } catch (err) {
    console.log('DB Error: ', err.message);
    res.status(503).json({
      status: 503,
      message: 'Something went wrong: DB Error',
      error: err,
    });
  }
};

// Delete any comments
const deleteCommentsByid = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.user_id;
  try {
    const affectedRows = await deleteOneComment(id, userId);
    if (affectedRows === 0) {
      res.status(404).json({
        status: 404,
        message: `Comment not found or you don't have permission to delete`,
        commentId: id,
      });
    } else {
      res
        .status(200)
        .json({status: 200, message: 'Comment deleted succesfully'});
    }
  } catch (err) {
    console.error('DB Error: ', err.message);
    return res.status(503).json({
      status: 503,
      message: 'Something went wrong: DB Error',
      error: err.message,
    });
  }
};

// Delete all comments from media_id
const deleteAllMediaComments = async (req, res) => {
  const id = Number(req.params.id);
  const affectedRows = await deleteAllComments(id);
  if (affectedRows === 0) {
    res.status(404).json({
      status: 404,
      message: `No comments for this mediaId`,
      mediaId: id,
    });
  } else {
    res.status(200).json({
      status: 200,
      message: `All media's comments deleted succesfully`,
      mediaId: id,
    });
  }
};

export {
  getCommentsByMedia,
  getCommentsByUser,
  postComments,
  deleteCommentsByid,
  deleteAllMediaComments,
};
