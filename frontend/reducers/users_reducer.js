// This will produce our users slice of state inside our "entities" key.

// keeps track of all of our users
import { merge } from 'lodash';

import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_ALL_USERS, RECEIVE_USER, CHANGE_USER_INFO } from '../actions/user_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      // 1: { id: 1, username: "Example", email: "Example" }
      return merge({}, state, { [action.currentUser.id]: action.currentUser });
    case RECEIVE_ALL_USERS:
      return action.users;
    case RECEIVE_USER:
      return merge({}, state, action.user);
    case CHANGE_USER_INFO:
      const newState = merge({}, state);
      newState[action.data.id] = action.data;
      return newState;
    default:
      return state;
  }
};

// The Redux state structure below will be created by our reducers that will use the data given via our actions.
// =================================================
// {
//   entities: {
//     users: { }
//   },
//   session: {
//     id: null,
//   },
//   errors: {
//     session: ["Invalid credentials"]
//   }
// }
// =================================================
// {
//   entities: {
//     users: {
//       1: {
//         id: 1,
//           username: 'breakfast'
//       }
//     }
//   },
//   session: {
//     id: 1
//   },
//   errors: {
//     session: []
//   }
// }
// =================================================