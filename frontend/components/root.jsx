import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
var http = require("http");

import App from './app';
import AppContainer from './app_container';

export default ({ store }) => {
  // Keeps Heroku dyno awake
  setInterval(function() {
      http.get("http://polygram-lk.herokuapp.com");
  }, 300000); // every 5 minutes (300000)
  
  return (
    <Provider store={ store }>
      <HashRouter>
        {/* <App /> */}
        {/* <AppContainer /> */}
        <Route path="/" component={AppContainer} />
      </HashRouter>
    </Provider>
  )
}

// TEST SIGN IN //
// let loyd = {username: "Loyd", password: "starwars", email: "aaa"}
// dispatch(signin(loyd))
// TEST SIGN IN //
