import * as LikeAJAX from '../utils/like_api_util';

export const RECEIVE_LIKES = "RECEIVE_LIKES";
export const CREATE_LIKE = "CREATE_LIKE";
export const DELETE_LIKE = "DELETE_LIKE";

const receiveLikes = likes => {
  return {
    type: RECEIVE_LIKES,
    likes,
  };
};

const spawnLike = like => {
  return {
    type: CREATE_LIKE,
    like,
  };
};

const removeLike = userId => {
  return {
    type: DELETE_LIKE,
    userId,
  };
};

export const fetchLikes = () => dispatch => {
  return LikeAJAX.fetchLikes().then(likes => dispatch(receiveLikes(likes)));
};

export const createLike = like => dispatch => {
  return LikeAJAX.createLike(like).then(like => dispatch(spawnLike(like)));
};

export const deleteLike = likeId => dispatch => {
  return LikeAJAX.deleteLike(likeId).then(like => dispatch(removeLike(like.user_id)));
};
