import { merge } from 'lodash';

import { FOLLOWS, FOLLOW_USER, UNFOLLOW_USER } from '../actions/follower_action';

export default (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch(action.type) {
    case FOLLOWS:
      return action.follows;
    case FOLLOW_USER:
      newState[action.follow.id] = action.follow;
      return newState;
    case UNFOLLOW_USER:
      delete newState[action.followId];
      return newState;
    default:
      return state;
  }
};
