import React from 'react';
import { Redirect } from 'react-router-dom';

import UserPostsContainer from './user_posts_container';
import UserProfileContainer from './user_profile_container';
import FeaturedLinks from './featured_links';
import CogButtonModal from './cog_button_modal';

export default class UserProfileMaster extends React.Component {
  componentWillMount() {
    this.props.getUsers();
  }
  
  componentDidMount() {
    this.props.getUsers();
  }
  
  render() {
    if (document.documentElement.scrollTop !== 0) {
      window.scrollTo(0, -document.documentElement.scrollTop);
    }
    let userProfileMaster;
    if (this.props.currentUser) {
      userProfileMaster = (
        <div>
          <UserProfileContainer user_id={this.props.userId} />
          <FeaturedLinks />
          <UserPostsContainer user_id={this.props.userId} />
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
