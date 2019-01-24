import React from 'react';
import { Route } from 'react-router-dom';

import GreetingContainer from './greeting_container';
import SignInFormContainer from './sign_in_form_container';
import SignUpFormContainer from './sign_up_form_container';
import { AuthRoute } from '../utils/route_util';

import NavbarContainer from './posts/navbar_container';
// import Footer from './footer/footer';
import FooterContainer from './footer/footer_container';

export default () => {
  return (
    <div className="app-container">
      <div className="app-body">
        <header>
          <nav>
            <NavbarContainer />
          </nav>
          <GreetingContainer />
        </header>

        <AuthRoute exact path="/" component={ SignUpFormContainer } />
        <AuthRoute exact path="/accounts/login" component={ SignInFormContainer } />
        <AuthRoute exact path="/accounts/emailsignup" component={ SignUpFormContainer } />
      </div>

      <div className="app-footer">
        <Route path="/" component={ FooterContainer } />
      </div>
    </div>
  )
}
