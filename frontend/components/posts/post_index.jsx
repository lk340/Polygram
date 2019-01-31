import React from 'react';

import { formatTime } from '../../utils/date_util';

export default class PostIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      heartStatus: "heart-show", 
      heart2Status: "heart-hide",
      bookmarkStatus: "bookmark-show",
      bookmark2Status: "bookmark-hide",
      timer: 0,
    };

    this.handleHeartClick = this.handleHeartClick.bind(this);
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }
  
  componentDidMount() {
    this.props.users();
    this.props.posts();
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    // clearInterval(this.interval);
  }
  
  componentDidUpdate(prevProps) {
    // console.log(prevProps);
    console.log(this.state.timer);
  }

  tick() {
    this.setState(prevState => ({
      timer: prevState.timer + 1
    }));
  }

  handleHeartClick() {
    if (this.state.heartStatus === "heart-show" && this.state.heart2Status === "heart-hide") {
      this.setState({ heartStatus: "heart-hide", heart2Status: "heart-show" });
    }
    else {
      this.setState({ heartStatus: "heart-show", heart2Status: "heart-hide" });
    }
  }

  handleBookmarkClick() {
    if (this.state.bookmarkStatus === "bookmark-show" && this.state.bookmark2Status === "bookmark-hide") {
      this.setState({ bookmarkStatus: "bookmark-hide", bookmark2Status: "bookmark-show" });
    }
    else {
      this.setState({ bookmarkStatus: "bookmark-show", bookmark2Status: "bookmark-hide" });
    }
  }

  handleCommentSubmit(event) {
    event.preventDefault();
    // insert thunk action creator for posting a comment into the back end
  }
  
  render() {
    let posts;
    // if ((Object.keys(this.props.allUsers).length > 1) && (this.props.currentURL === "/")) {
    if ((this.props.currentUser) && (this.props.currentURL === "/")) {
      posts = this.props.allPosts.map((post, index) => {
        if (this.props.allUsers[post.user_id]) {
          debugger;
          return (
            <div className="post-container" key={index}>
              <div className="post-top">
                {/* <div className="user-photo">[ userphoto size 30x30 border-radius 50% on image ] &nbsp;</div> */}
                <div className="user-photo"><img src={window.userDefaultProfilePicture} alt="user-profile-picture" /> &nbsp;</div>
                <div className="post-username">{this.props.allUsers[post.user_id].username}</div>
              </div>

              <img src={post.photoURL} />

              <div className="post-actions">
                <div className="post-like-comment">
                  <div className={this.state.heartStatus} onClick={this.handleHeartClick}><i className="far fa-heart"></i></div>
                  <div className={this.state.heart2Status} onClick={this.handleHeartClick}><i className="fas fa-heart red-heart"></i></div>
                  <div>
                    <label htmlFor="index-comment">
                      <i className="far fa-comment"></i>
                    </label>
                  </div>
                  <div></div>
                </div>

                <div className={this.state.bookmarkStatus} onClick={this.handleBookmarkClick} ><i className="far fa-bookmark"></i></div>
                <div className={this.state.bookmark2Status} onClick={this.handleBookmarkClick} ><i className="fas fa-bookmark"></i></div>
              </div>

              <div className="post-likes">insert # likes here</div>

              <div className="post-caption" key={`post-${index}`}>
                <span className="post-username-span"> {this.props.allUsers[post.user_id].username} </span> {post.caption}
              </div>

              <div className="post-index-timestamp"><a href="#">{formatTime(post.created_at)}</a></div>

              <div className="post-index-comment-container">
                <div className="post-index-comment">
                  <form className="post-index-comment-form" onSubmit={this.handleCommentSubmit}>
                    <textarea id="index-comment" placeholder="Add a comment..."></textarea>
                  </form>
                </div>
                <span>...</span>
              </div>
            </div>
          )
        }
      });
    }

    return (
      <div className="post-index">
        { posts }
      </div>
    );
  }
}
