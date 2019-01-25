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
                <i class="fab fa-instagram"></i>
                <div></div>
                Polygram
            </a>
            </div>

            {/* <i class="fas fa-search"></i> */}
            <div className="navbar-search-bar"><input type="search" placeholder={`${<i class="fas fa-search"></i>} Search`} onSubmit={this.handleSubmit} /></div>

            <div className="navbar-icons">
              <div><Link to="/uploadpost"> {<i class="far fa-plus-square"></i>} </Link></div>
              <div className="navbar-compass"><Link to="/"> {<i class="far fa-compass"></i>} </Link></div>
              <div className={ navbarHeart }><i class="far fa-heart"></i></div>
              <div className="navbar-user"><Link to={`/${this.props.currentUser.username}`}>{<i class="far fa-user"></i>}</Link></div>
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