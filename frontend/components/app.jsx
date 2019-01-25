import React from 'react';
import { Route } from 'react-router-dom';

import GreetingContainer from './greeting_container';
import SignInFormContainer from './sign_in_form_container';
import SignUpFormContainer from './sign_up_form_container';
import { AuthRoute } from '../utils/route_util';

import NavbarContainer from './posts/navbar_container';
// import Footer from './footer/footer';
import PostFormContainer from './posts/post_form_container';
import Uploadbar from './upload_bar/upload_bar';
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
        <Route exact path="/uploadpost" component={ PostFormContainer } />
      </div>

      <Uploadbar />

      <div className="app-footer">
        <Route path="/" component={ FooterContainer } />
      </div>
    </div>
  )
}
