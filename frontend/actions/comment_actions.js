import * as CommentAJAX from '../utils/comment_api_util';

export const GET_COMMENTS = "GET_COMMENTS";
export const CREATE_COMMENT = "CREATE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const COMMENT_ERROR = "COMMENT_ERROR";

const getComments = (comments) => {
  return {
    type: FETCH_COMMENTS,
    comments,
  };
};

const createComment = comment => {
  return {
    type: CREATE_COMMENT,
    comment,
  };
};

const editComment = comment => {
  return {
    type: EDIT_COMMENT,
    comment,
  };
};

const removeComment = commentId => {
  return {
    type: REMOVE_COMMENT,
    commentId,
  };
};

const commentError = error => {
  return {
    type: COMMENT_ERROR,
    error,
  };
};

export const fetchComments = () => {
  return CommentAJAX.fetchComments().then(comments => dispatch(getComments(comments)));
};

export const postComment = data => dispatch => {
  return CommentAJAX.postComment(data)
    .then(
      data => dispatch(createComment(data)),
      error => dispatch(commentError(error.responseJSON))
    );
};

export const patchComment = data => dispatch => {
  return CommentAJAX.patchComment(data)
    .then(
      data => dispatch(editComment(data)),
      error => dispatch(commentError(error.responseJSON))
    );
};

export const deleteComment = id => dispatch => {
  return CommentAJAX.deleteComment(id)
    .then(
      data => dispatch(removeComment(data.id)),
      error => dispatch(commentError(error.responseJSON))
    );
};
