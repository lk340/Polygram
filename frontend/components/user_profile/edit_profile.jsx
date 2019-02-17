import React from 'react';

import { Redirect, Link } from 'react-router-dom';

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.currentUser.id,
      name: this.props.currentUser.name,
      username: this.props.currentUser.username,
      biography: this.props.currentUser.biography,
      email: this.props.currentUser.email,
      editProfileSuccessful: "edit-profile-successful-hide",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return event => {
      this.setState({ [field]: event.currentTarget.value });
    };
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.props.editUser({
      id: this.state.id,
      name: this.state.name,
      username: this.state.username,
      biography: this.state.biography,
      email: this.state.email,
    });
    this.setState({ editProfileSuccessful: "edit-profile-successful-show" });
  }
  
  render() {
    // const initialState = this.state;
    let editProfileSubmit = "edit-profile-submit";
    // if (this.state === initialState) {
    //   editProfileSubmit += " submit-fade";
    // }
    
    const { name, username, biography, email } = this.state;

    // let editProfileSuccessful = "edit-profile-successful";

    let editUserForm;
    let redirect;
    if (this.props.currentUser.id) {
      editUserForm = (
        <div className="edit-profile-container">
          <div className="edit-profile-options">
            <ul>
              <li><a><b>Edit Profile</b></a></li>
              {/* <li><a href="#">Change Password</a></li>
              <li><a href="#">Authorized Applications</a></li>
              <li><a href="#">Email and SMS</a></li>
              <li><a href="#">Manage Contacts</a></li>
              <li><a href="#">Privacy and Security</a></li> */}
            </ul>
          </div>

          <form onSubmit={this.handleSubmit}>
            {/* <h1><span><img src={window.userDefaultProfilePicture} alt="profile-picture"/></span>{this.props.currentUser.username}</h1> */}
            <div className="form-bottom">
              <div className="edit-profile-labels">
                <ul>
                  <li><img src={window.userDefaultProfilePicture} alt="profile-picture"/></li>
                  <li>Name</li>
                  <li>Username</li>
                  <li>Bio</li>
                  <li>Email</li>
                </ul>
              </div>

              <div className="edit-profile-fields">
                <ul>
                  <li>
                    <div>
                      <h1>{this.props.currentUser.username}</h1>
                      <button onClick={this.handleProfilePhotoChange}>Change Profile Photo</button>
                    </div>
                  </li>
                  <li><input type="text" value={name} onChange={this.handleChange("name")} /></li>
                  <li><input type="text" value={username} onChange={this.handleChange("username")} /></li>
                  <li><textarea onChange={this.handleChange("biography")} value={biography} maxLength="150"></textarea></li>
                  <li><div className="edit-profile-private-information">Private Information</div></li>
                  <li><input type="text" value={email} onChange={this.handleChange("email")} /></li>
                  <li>
                    <button type="submit" className={editProfileSubmit}>
                      Submit
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      )
    }

    else {
      redirect = (<Redirect to="/" />)
    }
    return (
      <div>
        {editUserForm}
        {redirect}
        <div className={this.state.editProfileSuccessful}><div>Profile saved.</div></div>
      </div>
    )
  }
}
