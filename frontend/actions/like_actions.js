import * as LikeAJAX from '../utils/like_api_util';

export const RECEIVE_LIKE = "RECEIVE_LIKES";
export const REMOVE_LIKE = "REMOVE_LIKE";

const receiveLike = like => {
  return {
    type: RECEIVE_LIKE,
    like,
  };
};

const removeLike = like => {
  return {
    type: REMOVE_LIKE,
    like,
  };
};

export const recordLike = postId => dispatch => {
  return LikeAJAX.recordLike(postId).then(like => dispatch(receiveLike(like)));
};

export const deleteLike = (postId, likeId) => dispatch => {
  return LikeAJAX.deleteLike(postId, likeId).then(like => dispatch(removeLike(like)));
};