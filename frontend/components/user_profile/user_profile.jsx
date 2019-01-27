import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default (props) => {
  let userProfile;
  if (props.currentUser) {
    userProfile = (
      <div className="user-information">
        <div className="profile-picture">
          [ propic ]
        </div>

        <div className="profile-information">

          <div className="user-name-edit-profile-gear-icon">
            <div><span className="user-profile-username">{props.currentUser.username}</span></div>
            <div><Link to="/accounts/edit" className="edit-profile-button">Edit Profile</Link></div>
            <div><i className="fas fa-cog"></i></div>
          </div>

          <div className="posts-followers-following">
            <div className="user-posts">userposts</div>
            <div className="user-followers">userfollowers</div>
            <div className="user-following">userfollowing</div>
          </div>

          <div className="user-info">
            <div className="users-name">User's Name Here</div>
            <div className="user-bio">
              User's biography here
            </div>
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