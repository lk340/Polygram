// keeps track of relational data in our app

import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import postsReducer from './posts_reducer';
import likesReducer from './likes_reducer';
import commentsReducer from './comments_reducer';
import followersReducer from './followers_reducer';

export default combineReducers({
  users: usersReducer,
  posts: postsReducer,
  likes: likesReducer,
  comments: commentsReducer,
  followers: followersReducer,
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