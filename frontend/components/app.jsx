import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';

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
import UserProfileMasterContainer from './user_profile/user_profile_master_container'

export default () => {
  return (
    <div className="app-container">
    
      {/* <div className="cog-button-modal hide-greeting-modal"> */}
        {/* <div className="cog-button-modal-background"></div> */}
        {/* <div className="greeting-container"><GreetingContainer /></div>
      </div> */}

      <GreetingContainer/>

      <div className="app-body-container">
        <div className="app-main">

          <div className="app-body">
            <header>
              <nav>
                <NavbarContainer />
              </nav>
            </header>

            <Route exact path="/" component={ PostIndexContainer } />

            <div className="app-user-profile">
              <Route exact path="/users/profile" component={UserProfileMasterContainer} />
            
              {/* <UserProfileMasterContainer /> */}
              {/* <Route exact path="/demoUser" component={ UserProfileContainer } />
              <div className="app-user-profile-splitter">
                <Link to="/"><i className="fas fa-th"></i> POSTS</Link>
                <Link to="/"><i className="fas fa-tv"></i> IGTV</Link>
                <Link to="/"><i className="far fa-bookmark"></i>SAVED</Link>
                <Link to="/"><i className="fal fa-id-card-alt"></i> TAGGED</Link>
              </div>
              <Route exact path="/demoUser" component={ UserPostsContainer } /> */}
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
