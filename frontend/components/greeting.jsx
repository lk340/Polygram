import React from 'react';
import { Link } from 'react-router-dom'; 
import Modal from 'react-modal';

export default class Greeting extends React.Component {
  constructor(props) {
    super(props);

    // this.state = { class: "cog-button-modal" };
    // this.state = { class: "cog-button-modal" };

    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel(event) {
    event.preventDefault();
    this.setState({ class: "greeting-modal-closed" });
  }
  
  handleSignOut(event) {
    event.preventDefault();
    this.props.signOut();
    // this.props.history.push("/");
  }
  
  render() {
    const { currentUserId, currentUser } = this.props;
    let welcome;

    if (currentUserId) {
      welcome = (
        // <div className="cog-button-modal hide-greeting-modal">
        // <div className={ this.state.class }>
        <div className="cog-button-modal">
          <div className="greeting-container">
            <div className="greeting">
              {/* <h3>Welcome, { currentUser.username }!</h3> */}
              <div className="greeting-first-link"><Link to="/">Change Password</Link></div>
              <div><Link to="/">Nametag</Link></div>
              <div><Link to="/">Authorized Apps</Link></div>
              <div><Link to="/">Notifications</Link></div>
              <div><Link to="/">Privacy and Security</Link></div>
              <div><a onClick={this.handleSignOut}> Log Out </a></div>
              <div><a className="greeting-cancel" onClick={this.handleCancel}> Cancel </a></div>
              {/* <input type="submit" onClick={this.handleSignOut} value="Log Out" className="greeting-sign-out" /> */}
              {/* <div><button onClick={this.handleSignOut} >Log Out</button></div>
          <div><button className="greeting-cancel">Cancel</button></div> */}
            </div>
          </div>
        </div>
      )
    }

    // else {
    //   welcome = (
    //     <div>
    //       <Link to="/signup">Sign Up</Link>
    //       <Link to="/signin">Sign In</Link>
    //     </div>
    //   )
    // }

    return (
      <div>
        { welcome }
      </div>
    )
  }
}
