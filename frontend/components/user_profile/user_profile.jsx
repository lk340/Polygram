import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';

// export default (props) => {
export default class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    // this.state = { class: "greeting-modal-closed" };
    this.state = {
      modalOpen: false,
      profile_picture: (this.props.profilePicture === null ? window.userDefaultProfilePicture : this.props.profilePicture),
    };
    
    this.handleClick = this.handleClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleProfilePictureSubmit = this.handleProfilePictureSubmit.bind(this);
    this.handleProPicAutoSubmit = this.handleProPicAutoSubmit.bind(this);
  }

  componentDidMount() {
    this.props.allPosts();
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

  handleSignOut(event) {
    event.preventDefault();
    this.props.signOut();
    // this.props.history.push("/");
  }

  handleProfilePictureSubmit(event) {
    event.preventDefault();
    console.log("successfully submitted!");
    
    const formData = new FormData();
    formData.append("user[username]", this.props.currentUser.username);
    if (this.state.photoFile) {
      formData.append("user[photo]", this.state.photoFile);
    }
    formData.append("post[user_id]", this.state.user_id);

    this.props.createAWS(formData); // thunk action creator
    
    // this.props.editUser({
    //   id: this.props.sessionId,
    //   username: this.props.currentUser.username,
    //   email: this.props.currentUser.email,
    //   name: this.props.currentUser.name,
    //   biography: this.props.currentUser.biography,
    //   profile_picture: this.props.profilePicture,
    // });
  }

  handleProPicAutoSubmit() {
    // submit();
  }
  
  render() {
    const allPosts = Object.values(this.props.posts);
    let numberPosts = 0;
    allPosts.forEach(post => {
      if(post.user_id === this.props.sessionId) numberPosts += 1;
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
        overflow: "hidden",
      }
    };
    
    let userProfile;
    if (this.props.currentUser) {
      userProfile = (
        <div className="user-information">
          <div className="profile-picture">
            {/* [ propic ] */}
            {/* <img className="user-pro-pic" src={ this.state.profile_picture } alt="user-profile-picture" /> */}

            <form className="user-profile-picture-form" onSubmit={this.handleProfilePictureSubmit}>
              <label htmlFor="user-profile-input">
                <img className="user-pro-pic" src={this.state.profile_picture} alt="profile-picture"/>
              </label>
              <input type="file" id="user-profile-input" onChange={this.handleProPicAutoSubmit}/>
              <input className="user-profile-picture-form-submit-input" type="submit"/>
            </form>

          </div>

          <div className="profile-information">
            <div className="user-name-edit-profile-gear-icon">
              <div><span className="user-profile-username">{this.props.currentUser.username}</span></div>
              <div><Link to="/accounts/edit" className="edit-profile-button">Edit Profile</Link></div>
              <div className="user-profile-cog" onClick={ this.handleClick }><i className="fas fa-cog"></i></div>
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