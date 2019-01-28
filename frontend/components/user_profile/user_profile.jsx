import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// export default (props) => {
export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { class: "greeting-modal-closed" };
  }

  componentDidMount() {
    this.props.allPosts();
  }
  
  showGreetingModal(event) {
    this.setState({ class: "cog-button-modal" })
  }
  
  render() {
    const allPosts = Object.values(this.props.posts);
    let numberPosts = 0;
    allPosts.forEach(post => {
      if(post.user_id === this.props.sessionId) numberPosts += 1;
    });
    
    let userProfile;
    if (this.props.currentUser) {
      userProfile = (
        <div className="user-information">
          <div className="profile-picture">
            {/* [ propic ] */}
            <img className="user-pro-pic" src={ window.userDefaultProfilePicture } alt="user-profile-picture" />
          </div>

          <div className="profile-information">
            <div className="user-name-edit-profile-gear-icon">
              <div><span className="user-profile-username">{this.props.currentUser.username}</span></div>
              <div><Link to="/accounts/edit" className="edit-profile-button">Edit Profile</Link></div>
              <div className="user-profile-cog" ><i className="fas fa-cog"></i></div>
            </div>

            <div className="posts-followers-following">
              <div className="user-posts"><b>{ numberPosts }</b> { numberPosts > 1 ? "posts" : "post" } </div>
              <div className="user-followers"><b>1</b> followers</div>
              <div className="user-following"><b>1</b> following</div>
            </div>

            <div className="user-info">
              <div className="users-name"><b>{ this.props.currentUser.name }</b></div>
              <div className="user-bio">{ this.props.currentUser.biography }</div>
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
        { userProfile }
      </div>
    )
  }
}