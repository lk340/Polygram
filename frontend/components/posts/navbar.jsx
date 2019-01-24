import React from 'react';
import { Link } from 'react-router-dom'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.showPost;
  }
  
  render() {
    let navBar;
    if (this.props.sessionId) {
      navBar = (
        <div className="navbar">

          <div className="navbar-polygram-logo">
            <a href="#">
              <i class="fab fa-instagram"></i>
              <div></div>
              Polygram
            </a>
          </div>

          {/* <i class="fas fa-search"></i> */}
          <div className="navbar-search-bar"><input type="search" placeholder={`${<i class="fas fa-search"></i>} Search`} onSubmit={ this.handleSubmit } /></div>

          <div className="navbar-icons">
            <div className="navbar-compass"><i class="far fa-compass"></i></div>
            <div className="navbar-heart"><i class="far fa-heart"></i></div>
            <div className="navbar-user"><Link to={`/${this.props.currentUser.username}`}>{<i class="far fa-user"></i>}</Link></div>
          </div>

        </div>
      )
    }

    return (
      <div className="navbar-container">
        {navBar}
      </div>
    )
  }
}