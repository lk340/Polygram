// In charge of handling our session errors in our errors slice of state.

import { merge } from 'lodash';

import { RECEIVE_SESSION_ERRORS, RECEIVE_CURRENT_USER, CLEAR_ERRORS } from '../../actions/session_actions';

export default (state = [], action) => {
  Object.freeze(state);

  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return merge([], state, action.errors);
    case RECEIVE_CURRENT_USER:
      return [];
    case CLEAR_ERRORS:
      return [];
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