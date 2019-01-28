import React from 'react';
import { Redirect } from 'react-router-dom';

import UserPostsContainer from './user_posts_container';
import UserProfileContainer from './user_profile_container';
import FeaturedLinks from './featured_links';
import CogButtonModal from './cog_button_modal';

export default class UserProfileMaster extends React.Component {
  
  render() {
    let userProfileMaster;
    if (this.props.currentUser) {
      userProfileMaster = (
        <div>
          <UserProfileContainer />
          <FeaturedLinks />
          <UserPostsContainer />
        </div>
      )
    }

    else {
      userProfileMaster = (
        <Redirect to="/" />
      )
    }
    
    return (
      <div>
        { userProfileMaster }
        {/* <CogButtonModal /> */}
      </div>
    )
  }
}