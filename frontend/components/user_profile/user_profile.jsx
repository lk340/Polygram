import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default (props) => {
  let userProfile;
  if (props.currentUser) {
    userProfile = (
      <div className="user-information">
        <div className="profile-picture">
          hello from user profile!
      </div>

        <div className="profile-information">
          <div className="user-name-edit-profile-gear-icon">
            <div>{props.currentUser.username}</div>
            <div><button><Link to="/accounts/edit">Edit Profile</Link></button></div>
            <div><i className="fas fa-cog"></i></div>
          </div>

          <div className="posts-followers-following">

          </div>

          <div className="user-bio">

          </div>
        </div>
      </div>
    )
  }

  else {
    userProfile = (
      <Redirect to="/" />
    )
  }
  
  return (
    <div>
      {userProfile}
    </div>
  )
}