// This will produce our sessions slice of state.

import { RECEIVE_CURRENT_USER, SIGN_OUT_CURRENT_USER } from '../actions/session_actions';

const _nullUser = {
  id: null,
};

export default (state = _nullUser, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      // When a user signs up / signs in, add their id to our session.
      return { id: action.currentUser.id };
    case SIGN_OUT_CURRENT_USER:
      // When a user signs out, get rid of their id.
      return { id: null };
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