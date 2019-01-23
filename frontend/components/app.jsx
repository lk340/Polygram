import React from 'react';
import { Route } from 'react-router-dom';

import GreetingContainer from './greeting_container';
import SignInFormContainer from './sign_in_form_container';
import SignUpFormContainer from './sign_up_form_container';
import { AuthRoute } from '../utils/route_util';

export default () => {
  return (
    <div>
      <header>
        <h1>Polygram</h1>
        <GreetingContainer />
      </header>

      <AuthRoute exact path="/" component={ SignUpFormContainer } />
      <AuthRoute exact path="/signin" component={ SignInFormContainer } />
      <AuthRoute exact path="/signup" component={ SignUpFormContainer } />
    </div>
  )
}
