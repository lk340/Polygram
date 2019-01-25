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
    let navbarHeart = "navbar-heart";

    let activityOnPosts = "activity-on-posts";
    
    let navBar;
    if (this.props.sessionId) {
      navBar = (
        <div className="navbar-container">
          <div className="navbar">

            <div className="navbar-polygram-logo">
              <a href="#">
                <i className="fab fa-instagram"></i>
                <div></div>
                <span>Polygram</span>
            </a>
            </div>

            {/* <i className="fas fa-search"></i> */}
            <div className="navbar-search-bar"><input type="search" placeholder={`${<i className="fas fa-search"></i>} Search`} onSubmit={this.handleSubmit} /></div>

            <div className="navbar-icons">
              <div><Link to="/uploadpost"> {<i className="far fa-plus-square"></i>} </Link></div>
              <div className="navbar-compass"><Link to="/"> {<i className="far fa-compass"></i>} </Link></div>
              <div className={navbarHeart}><i className="far fa-heart"></i></div>
              <div className="navbar-user"><Link to={`/${this.props.currentUser.username}`}>{<i className="far fa-user"></i>}</Link></div>
              <div><i className="fas fa-cog"></i></div>
            </div>

          </div>
        </div>
      )
    }

    return (
      <div>
        {navBar}
        
        <div className="navbar-heart-pop-up" >
          <div className="triangle"></div>
          <div className={activityOnPosts}>
            <div>Heart</div>
            <div>Activity On Your Posts</div>
            <div>When someone likes or comments on one of your posts, you'll see it here.</div>
          </div>
        </div>
      </div>
    )
  }
}