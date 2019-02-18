import React from 'react';

import { Redirect, Link } from 'react-router-dom';

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idOG: this.props.currentUser.id,
      nameOG: this.props.currentUser.name,
      usernameOG: this.props.currentUser.username,
      biographyOG: this.props.currentUser.biography,
      emailOG: this.props.currentUser.email,
      photoFileOG: null,
      photoURLOG: null,
      id: this.props.currentUser.id,
      name: this.props.currentUser.name,
      username: this.props.currentUser.username,
      biography: this.props.currentUser.biography,
      email: this.props.currentUser.email,
      photoFile: null,
      photoURL: null,
      editProfileSuccessful: "edit-profile-successful-hide",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleProfilePhotoChange = this.handleProfilePhotoChange.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleChange(field) {
    return event => {
      this.setState({ [field]: event.currentTarget.value });
    };
  }
  
  handleSubmit(event) {
    event.preventDefault();

    // this.props.editUser({
    //   id: this.state.id,
    //   name: this.state.name,
    //   username: this.state.username,
    //   biography: this.state.biography,
    //   email: this.state.email,
    // });

    const formData = new FormData();

    if (this.state.photoFile) {
      formData.append("user[profile_picture]", this.state.photoFile);
    }
    formData.append("user[name]", this.state.name);
    formData.append("user[username]", this.state.username);
    formData.append("user[biography]", this.state.biography);
    formData.append("user[email]", this.state.email);

    this.props.createAWS(formData);

    this.setState({ editProfileSuccessful: "edit-profile-successful-show" });
  }
  
  handleProfilePhotoChange(event) {
    event.preventDefault();
  }

  handleFile(event) {
    const file = event.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ 
        photoFileOG: file,
        photoURLOG: fileReader.result,
        photoFile: file,
        photoURL: fileReader.result,
      });
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }
  
  render() {
    // const initialState = this.state;
    let editProfileSubmit;
    if ( this.state.id === this.state.idOG && this.state.name === this.state.nameOG && this.state.username === this.state.usernameOG && this.state.biography === this.state.biographyOG && this.state.email === this.state.emailOG ) {
      editProfileSubmit = "edit-profile-submit-hidden";
    }

    else {
      editProfileSubmit = "edit-profile-submit";
    }
    
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
                  <li><label htmlFor="profile-photo-edit">{this.state.photoURL ? <img src={this.state.photoURL} alt="profile-picture"/> : <img src={window.userDefaultProfilePicture} alt="profile-picture"/>}</label></li>
                  {/* <li><label htmlFor="profile-photo-edit"><img src={window.userDefaultProfilePicture} alt="profile-picture"/></label></li> */}
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
                      <label htmlFor="profile-photo-edit" onClick={this.handleProfilePhotoChange}>
                        Change Profile Photo
                      </label>
                      <input type="file" id="profile-photo-edit" style={{"display": "none"}} onChange={this.handleFile} />
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
