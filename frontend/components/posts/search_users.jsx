import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return(
    <div className="search-users-component">
      <div className="search-users-container">

        <div><img src={window.userDefaultProfilePicture} alt="profile-picture"/></div>

        <div>
          <div className="search-users-username">
            <Link to={`/users/${props.user.id}`}>{props.user.username}</Link>
          </div>

          <div className="search-users-name">
            {props.user.name}
          </div>
        </div>

      </div>
    </div>
  )
}
