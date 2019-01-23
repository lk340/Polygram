import React from 'react';
import { Link } from 'react-router-dom';

export default class Greeting extends React.Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }
  
  handleSignOut(event) {
    event.preventDefault();
    this.props.signOut();
  }
  
  render() {
    const { currentUserId, currentUser } = this.props;
    let welcome;

    if (currentUserId) {
      welcome = (
        <div>
          <h3>Welcome, { currentUser.username }!</h3>
          <button onClick={ this.handleSignOut } >Sign Out</button>
        </div>
      )
    }

    else {
      welcome = (
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </div>
      )
    }

    return (
      <div>
        { welcome }
      </div>
    )
  }
}
