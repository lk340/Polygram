import * as FollowerAJAX from '../utils/comment_api_util';

export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

const followUser = follow => {
  return {
    type: FOLLOW_USER,
    follow,
  };
};

const unfollowUser = followId => {
  return {
    type: UNFOLLOW_USER,
    followId,
  };
};

export const createFollow = follow => dispatch => {
  return FollowerAJAX.createFollow(follow).then(follow => dispatch(followUser(follow)));
};

export const deleteFollow = followId => dispatch => {
  return FollowerAJAX.deleteFollow(followId).then(follow => dispatch(unfollowUser(follow.id)));
};
