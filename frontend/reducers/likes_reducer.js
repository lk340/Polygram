import { merge } from 'lodash';

import { RECEIVE_LIKES, CREATE_LIKE, DELETE_LIKE } from '../actions/like_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  const newState = merge({}, state);
  
  switch(action.type) {
    case RECEIVE_LIKES:
      return action.likes;
    case CREATE_LIKE:
      // newState[action.like.user_id] = action.like;
      newState[action.like.id] = action.like;
      return newState;
    case DELETE_LIKE:
      delete newState[action.userId];
      return newState;
    default:
      return state;
  }
};

// export default (state = {}, action) => {
//   Object.freeze(state);
//   const newState = merge({}, state);

//   switch (action.type) {
//     case RECEIVE_LIKES:
//       return action.likes;
//     case CREATE_LIKE:
//       if (!newState[action.like.user_id]) {
//         newState[action.like.user_id] = [action.like];
//       }
//       else {
//         newState[action.like.user_id].push(action.like);
//       }
//       return newState;
//     case DELETE_LIKE:
//       delete newState[action.like.userId].action.like.id;
//       return newState;
//     default:
//       return state;
//   }
// };
