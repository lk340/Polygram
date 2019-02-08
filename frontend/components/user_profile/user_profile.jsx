import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';

import FollowerModal from '../modals/follower_modal';

// export default (props) => {
export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    // this.state = { class: "greeting-modal-closed" };
    this.state = {
      modalOpen: false,
      modalOpen2: false,
      photoFile: null,
      photoURL: null,
      // profile_picture: (this.props.profilePicture === null ? window.userDefaultProfilePicture : this.props.profilePicture),
      profile_picture: window.userDefaultProfilePicture,
      followers: [],
      following: [],
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);


    this.handleFollowersModal = this.handleFollowersModal.bind(this);
    this.onModalClose2 = this.onModalClose2.bind(this);

    this.handleFollowingModal = this.handleFollowingModal.bind(this);
    
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleProfilePictureSubmit = this.handleProfilePictureSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);

  }

  componentDidMount() {
    this.props.getUsers();
    this.props.allPosts();
    this.props.getFollows();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.allFollows.length !== this.props.allFollows.length) {
      this.props.getUsers();
      this.props.getFollows();
    }
  }
  
  // showGreetingModal(event) {
  //   this.setState({ class: "cog-button-modal" })
  // }

  handleClick() {
    this.setState({ modalOpen: true });
  }

  onModalClose() {
    this.setState({ modalOpen: false });
  }

  onModalClose2() {
    this.setState({ modalOpen2: false });
  }

  handleSignOut(event) {
    event.preventDefault();
    this.props.signOut();
    // this.props.history.push("/");
  }

  handleFile(event) {
    const file = event.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ photoFile: file, photoURL: fileReader.result });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }
  
  handleProfilePictureSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append("user[username]", this.props.currentUser.username);
    formData.append("user[email]", this.props.currentUser.email);
    formData.append("user[name]", this.props.currentUser.name);
    formData.append("user[biography]", this.props.currentUser.biography);
    if (this.state.photoFile) {
      formData.append("user[profile_picture]", this.state.photoFile);
    }

    this.props.createUserAWS(formData); // thunk action creator
    
    // this.props.editUser({
    //   id: this.props.sessionId,
    //   username: this.props.currentUser.username,
    //   email: this.props.currentUser.email,
    //   name: this.props.currentUser.name,
    //   biography: this.props.currentUser.biography,
    //   profile_picture: this.props.profilePicture,
    // });
  }

  handleFollow(event) {
    event.preventDefault();
    this.props.followUser({
      user_id: this.props.user_id,
      follower_id: this.props.currentUser.id,
    });
  }

  handleUnfollow(userId) {
    return event => {
      event.preventDefault();

      let followId;
      this.props.allFollows.forEach(follow => {
        // debugger;
        if (follow.follower_id === this.props.sessionId && follow.user_id === userId) {
          followId = follow.id;
        }
      });
      this.props.unfollowUser(followId);
    }
  }

  handleFollowersModal() {
    this.setState({ modalOpen2: true });
  }

  handleFollowingModal() {
    alert("This is under development!");
  }
  
  render() {
    const allPosts = Object.values(this.props.posts);
    let numberPosts = 0;
    allPosts.forEach(post => {
      if(post.user_id === this.props.user_id) numberPosts += 1;
    });
    
    const modalStyle = {
      overlay: {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 99999,
      },
      content: {
        width: "400px",
        height: "336px",
        margin: "auto",
        borderRadius: "14px",
        border: "none",
        overflow: "hidden",
        animation: "gearModal 0.05s linear",
      }
    };

    const modalStyle2 = {
      overlay: {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 99999,
      },
      content: {
        width: "400px",
        height: "400px",
        margin: "auto",
        border: "none",
        borderRadius: "0",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        overflow: "auto",
        animation: "gearModal 0.05s linear",
        padding: "0",
      }
    };

    let followCount = 0;
    this.props.allFollows.forEach(follow => {
      if (follow.follower_id === this.props.user_id) {
        followCount += 1;
      }
    });
    
    let profileBar;
    if (this.props.user_id === this.props.sessionId) {
      profileBar = (
        <div className="user-profile-top-bar">
          <div><Link to="/accounts/edit" className="edit-profile-button">Edit Profile</Link></div>
          <div className="user-profile-cog" onClick={ this.handleClick }><i className="fas fa-cog"></i></div>
        </div>
      )
    }
    
    else {
      if (this.props.allUsers[this.props.user_id]) {
        if (!this.props.allUsers[this.props.user_id].user_followers.includes(this.props.sessionId)) {
          profileBar = <button className="user-profile-follow-button" onClick={this.handleFollow}>Follow</button>
        }
        else {
          profileBar = <button className="user-profile-unfollow-button" onClick={this.handleUnfollow(this.props.user_id)}>Following</button>
        }
      }
    }

    let followersLi;
    if (this.props.allUsers[this.props.user_id]) {
      if (this.props.allUsers[this.props.user_id].user_followers) {
        followersLi = this.props.allUsers[this.props.user_id].user_followers.map((user_id, index) => {
          return <li key={`follow-${index}`}>{this.props.allUsers[user_id].username}</li>
        })
      }
    }

    let followerLengthValue;
    if (this.props.allUsers[this.props.user_id]) {
      if(this.props.allUsers[this.props.user_id].user_followers) {
        followerLengthValue = this.props.allUsers[this.props.user_id].user_followers.length;
      }
    }
    // this.props.allUsers[this.props.user_id] ? this.props.allUsers[this.props.user_id].user_followers.length : this.state.followers.length

    let followerLength;
    if (this.props.allUsers[this.props.user_id]) {
      if(this.props.allUsers[this.props.user_id].user_followers) {
        if (this.props.allUsers[this.props.user_id].user_followers.length === 1) {
          followerLength = <span className="followers-span" onClick={this.handleFollowersModal}>follower</span>;
        }
        else {
          followerLength = <span className="followers-span" onClick={this.handleFollowersModal}>followers</span>;
        }
      }
    }
    else {
      followerLength = <span className="followers-span" onClick={this.handleFollowersModal}>followers</span>;
    }
    
    let userProfile;
    if (this.props.currentUser) {
      userProfile = (
        <div className="user-information">
          <div className="profile-picture">
            {/* [ propic ] */}
            <img className="user-pro-pic" src={ this.state.profile_picture } alt="user-profile-picture" />

            {/* <form className="user-profile-picture-form" onSubmit={this.handleProfilePictureSubmit}>
              <label htmlFor="user-profile-input">
                <img className="user-pro-pic" src={this.state.profile_picture} alt="profile-picture"/>
              </label>
              <input type="file" id="user-profile-input" onChange={this.handleFile}/>
              <input className="user-profile-picture-form-submit-input" type="submit"/>
            </form> */}

          </div>

          <div className="profile-information">
            <div className="user-name-edit-profile-gear-icon">
              <div><span className="user-profile-username">{this.props.allUsers[this.props.user_id] ? this.props.allUsers[this.props.user_id].username : this.props.allUsers[this.props.sessionId].username}</span></div>
              {/* <div><Link to="/accounts/edit" className="edit-profile-button">Edit Profile</Link></div>
              <div className="user-profile-cog" onClick={ this.handleClick }><i className="fas fa-cog"></i></div> */}
              { profileBar }
            </div>

            <Modal isOpen={ this.state.modalOpen } onRequestClose={ this.onModalClose } style={ modalStyle } >
              <div className="greeting">
                <div className="greeting-first-link"><Link to="/" target="_blank">Change Password</Link></div>
                <div><Link to="/" target="_blank">Nametag</Link></div>
                <div><Link to="/" target="_blank">Authorized Apps</Link></div>
                <div><Link to="/" target="_blank">Notifications</Link></div>
                <div><Link to="/" target="_blank">Privacy and Security</Link></div>
                <div><a onClick={this.handleSignOut}> Log Out </a></div>
                <div><a className="greeting-cancel" onClick={this.onModalClose}> Cancel </a></div>
              </div>
            </Modal>

            <div className="posts-followers-following">
              <div className="user-posts"><b>{ numberPosts }</b> { numberPosts > 1 || numberPosts === 0 ? "posts" : "post" } </div>
              {/* <div className="user-followers"><b>483m</b> followers</div> */}
              <div className="user-followers"><b>{followerLengthValue}</b> {followerLength}</div>
              {/* <div className="user-following"><b>0</b> following</div> */}
              <div className="user-following"><b>{followCount}</b> <span className="following-span" onClick={this.handleFollowingModal}>following</span></div>
            </div>

            <div className="user-info">
              <div className="users-name"><b>{ this.props.allUsers[this.props.user_id] ? this.props.allUsers[this.props.user_id].username : this.props.allUsers[this.props.sessionId].username }</b></div>
              {/* <div className="user-bio">{ this.props.currentUser.biography }</div> */}
              <div className="user-bio">{ this.props.allUsers[this.props.user_id] ? this.props.allUsers[this.props.user_id].biography : this.props.allUsers[this.props.sessionId].username }</div>
            </div>

              <Modal isOpen={ this.state.modalOpen2 } onRequestClose={ this.onModalClose2 } style={ modalStyle2 }>
                <div className="followers-modal">
                  <div className="followers-modal-header">
                    <div className="top-left"></div>

                    <h3><div>Followers</div></h3>

                    <div className="followers-modal-close" onClick={this.onModalClose2}>
                      <div><img src={window.followerModalClose} alt="close-follower-modal" /></div>
                    </div>
                  </div>

                  <div className="followers-modal-list">
                    <ul>
                      { followersLi }
                    </ul>
                  </div>
                </div>
              </Modal>

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