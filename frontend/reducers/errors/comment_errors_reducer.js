import { merge } from 'lodash';

import { COMMENT_ERROR } from '../../actions/comment_actions';

export default (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case COMMENT_ERROR:
      return merge([], state, action.error);
    default: 
      return state;
  }
};
