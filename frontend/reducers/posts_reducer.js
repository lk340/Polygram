import { merge } from 'lodash';

import { RECEIVE_POSTS, RECEIVE_POST, CREATE_POST, EDIT_POST, DELETE_POST } from '../actions/post_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);
  
  switch(action.type) {
    case RECEIVE_POSTS:
      return action.posts;
    case RECEIVE_POST:
      newState[action.post.id] = action.post;
      return newState;
    case CREATE_POST:
      newState[action.post.id] = action.post;
      return newState;
    case EDIT_POST:
      newState[action.post.id] = action.post;
      return newState;
    case DELETE_POST:
      delete newState[action.postId];
      return newState;
    default:
      return state;
  }
};
