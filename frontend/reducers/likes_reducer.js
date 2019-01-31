import { merge } from 'lodash';

import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);
  
  switch (action.type) {
    case RECEIVE_LIKE:
      // newState[action.like.id] = action.like;
      // return newState;
      return action.like;
    case REMOVE_LIKE:
      delete newState[action.like.id];
      return newState;
    default:
      return state;
  }
};
