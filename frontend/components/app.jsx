import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import GreetingContainer from './greeting_container';
import SignInFormContainer from './sign_in_form_container';
import SignUpFormContainer from './sign_up_form_container';
import { AuthRoute } from '../utils/route_util';

import NavbarContainer from './posts/navbar_container';
// import Footer from './footer/footer';
import PostFormContainer from './posts/post_form_container';
import Uploadbar from './upload_bar/upload_bar';
import FooterContainer from './footer/footer_container';
import PostIndexContainer from './posts/post_index_container';
import UserProfileContainer from './user_profile/user_profile_container';
import UserPostsContainer from './user_profile/user_posts_container';

export default () => {
  return (
    <div className="app-container">

      <div className="app-body-container">
        <div className="app-main">

          <div className="app-body">
            <header>
              <nav>
                <NavbarContainer />
              </nav>
              <GreetingContainer />
            </header>

            <Route exact path="/" component={ PostIndexContainer } />
            <div className="user-profile">
              <Route exact path="/demoUser" component={ UserProfileContainer } />
              <Route exact path="/demoUser" component={ UserPostsContainer } />
            </div>

            <AuthRoute exact path="/" component={ SignUpFormContainer } />
            <AuthRoute exact path="/accounts/login" component={ SignInFormContainer } />
            <AuthRoute exact path="/accounts/emailsignup" component={ SignUpFormContainer } />
            <Route exact path="/posts/new" component={ PostFormContainer } />
          </div>

          <Uploadbar />

        </div>
      </div>

      <div className="app-footer">
        <Route path="/" component={ FooterContainer } />
      </div>
      
    </div>
  )
}
