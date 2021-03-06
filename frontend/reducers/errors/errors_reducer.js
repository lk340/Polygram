import { combineReducers } from 'redux';

import sessionErrorsReducer from './session_errors_reducer';
import postErrorsReducer from './post_errors_reducer';
import commentErrorsReducer from './comment_errors_reducer';

export default combineReducers({
  session: sessionErrorsReducer,
  post: postErrorsReducer,
  comment: commentErrorsReducer,
});

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