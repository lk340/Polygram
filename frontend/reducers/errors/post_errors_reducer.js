import { merge } from 'lodash';

import { POST_ERRORS } from '../../actions/post_actions';

export default (state = [], action) => {
  Object.freeze(state);
  // const newState = merge([], state);
  switch(action.type) {
    case POST_ERRORS:
      return merge([], state, action.errors);
    default:
      return state;
  }
};
