import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './app';

export default ({ store }) => {
  return (
    <Provider store={ store }>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  )
}

// TEST SIGN IN //
// let loyd = {username: "Loyd", password: "starwars", email: "aaa"}
// dispatch(signin(loyd))
// TEST SIGN IN //
