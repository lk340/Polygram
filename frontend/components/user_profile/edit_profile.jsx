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
    this.props.editUser(this.state);
  }
  
  render() {
    // const initialState = this.state;
    let editProfileSubmit = "edit-profile-submit";
    // if (this.state === initialState) {
    //   editProfileSubmit += " submit-fade";
    // }
    
    const { name, username, biography, email } = this.state;

    let editUserForm;
    let redirect;
    if (this.props.currentUser.id) {
      editUserForm = (
        <div className="edit-profile-container">
          <div className="edit-profile-options">
            <ul>
              <li><a href="#"><b>Edit Profile</b></a></li>
              {/* <li><a href="#">Change Password</a></li>
              <li><a href="#">Authorized Applications</a></li>
              <li><a href="#">Email and SMS</a></li>
              <li><a href="#">Manage Contacts</a></li>
              <li><a href="#">Privacy and Security</a></li> */}
            </ul>
          </div>

          <form onSubmit={this.handleSubmit}>
            <h1>{this.props.currentUser.username}</h1>
            <div className="form-bottom">
              <div className="edit-profile-labels">
                <ul>
                  <li>Name</li>
                  <li>Username</li>
                  <li>Bio</li>
                  <li>Email</li>
                </ul>
              </div>

              <div className="edit-profile-fields">
                <ul>
                  <li><input type="text" value={name} onChange={this.handleChange("name")} /></li>
                  <li><input type="text" value={username} onChange={this.handleChange("username")} /></li>
                  <li><textarea onChange={this.handleChange("biography")} value={biography} ></textarea></li>
                  <li><div>Private Information</div></li>
                  <li><input type="text" value={email} onChange={this.handleChange("email")} /></li>
                  <li><a href="https://github.com/lk340" target="_blank" className="edit-profile-field-confirm-email">Github</a></li>
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
      </div>
    )
  }
}