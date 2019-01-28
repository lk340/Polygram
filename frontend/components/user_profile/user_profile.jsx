import React from 'react';
import { Link, Redirect } from 'react-router-dom';

export default (props) => {
  let userProfile;
  if (props.currentUser) {
    userProfile = (
      <div className="user-information">
        <div className="profile-picture">
          [ propic ]
          {/* <img src="../../../app/assets/images/default_profile_picture.jpg" alt="default-profile-picture"/> */}
        </div>

        <div className="profile-information">

          <div className="user-name-edit-profile-gear-icon">
            <div><span className="user-profile-username">{props.currentUser.username}</span></div>
            <div><Link to="/accounts/edit" className="edit-profile-button">Edit Profile</Link></div>
            <div className="user-profile-cog"><i className="fas fa-cog"></i></div>
          </div>

          <div className="posts-followers-following">
            <div className="user-posts"><b>1</b> posts</div>
            <div className="user-followers"><b>1</b> followers</div>
            <div className="user-following"><b>1</b> following</div>
          </div>

          <div className="user-info">
            <div className="users-name"><b>User's Name Here</b></div>
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