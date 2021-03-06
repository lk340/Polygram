import { merge } from 'lodash';

import { GET_COMMENTS, CREATE_COMMENT, EDIT_COMMENT, REMOVE_COMMENT } from '../actions/comment_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);

  switch(action.type) {
    case GET_COMMENTS:
      return action.comments;
    case CREATE_COMMENT:
      newState[action.comment.id] = action.comment;
      return newState;
    case EDIT_COMMENT:
      newState[action.comment.id] = action.comment;
      return newState;
    case REMOVE_COMMENT:  
      delete newState[action.commentId];
      return newState;
    default:
      return state;
  }
};
