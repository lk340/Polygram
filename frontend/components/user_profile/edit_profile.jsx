import React from 'react';

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { name, username, biography, email } = this.state;
    
    return (
      <div className="edit-profile-container">
        <div className="edit-profile-options">
          <ul>
            <li><a href="#">Edit Profile</a></li>
            <li><a href="#">Change Password</a></li>
            <li><a href="#">Authorized Applications</a></li>
            <li><a href="#">Email and SMS</a></li>
            <li><a href="#">Manage Contacts</a></li>
            <li><a href="#">Privacy and Security</a></li>
          </ul>
        </div>

        <form onSubmit={this.handleSubmit}>
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
              <li><textarea onChange={this.handleChange("biography")} >{biography}</textarea></li>
              <li><div>Private Information</div></li>
              <li><input type="text" value={email} onChange={this.handleChange("email")} /></li>
              <li><button className="edit-profile-field-confirm-email">Confirm Email</button></li>
            </ul>
          </div>
        </form>
      </div>
    )
  }
}
