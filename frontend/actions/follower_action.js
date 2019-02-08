import * as FollowerAJAX from '../utils/follower_api_util';

export const FOLLOWS = "FOLLOWS";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

const allFollows = (follows) => {
  return {
    type: FOLLOWS,
    follows,
  };
};

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

export const follows = () => dispatch => {
  return FollowerAJAX.getFollowers().then(follows => dispatch(allFollows(follows)));
};

export const createFollow = follow => dispatch => {
  return FollowerAJAX.createFollow(follow).then(follow => dispatch(followUser(follow)));
};

export const deleteFollow = followId => dispatch => {
  return FollowerAJAX.deleteFollow(followId).then(follow => dispatch(unfollowUser(follow.id)));
};
