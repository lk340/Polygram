import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import configureStore from './store/store';

// TEST IMPORTS START //
// import * as ApiUtils from './utils/session_api_util';
// import { signUp, signIn, signOut } from './actions/session_actions'; 
// TEST IMPORTS END //

document.addEventListener("DOMContentLoaded", () => {
  let store;
  
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id },
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  }

  else {
    store = configureStore();
  }

  // TEST ZONE START //
  // window.signup = signUp;
  // window.signin = signIn;
  // window.signout = signOut;

  // window.getState = store.getState();
  // window.dispatch = store.dispatch;
  // TEST ZONE END //
  
  ReactDOM.render(<Root store={store} />, document.getElementById("root"));
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