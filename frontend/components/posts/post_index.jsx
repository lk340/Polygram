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
      // timer: 0,
    };

    this.handleHeartClick = this.handleHeartClick.bind(this);
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }
  
  componentDidMount() {
    this.props.users();
    this.props.posts();
    this.props.likes();
    // this.interval = setInterval(() => this.tick(), 1000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
  
  // componentDidUpdate(prevProps) {
  //   if (prevProps.allPosts.length !== this.props.allPosts.length) {
  //     this.props.posts();
  //   }
  // }

  // tick() {
  //   this.setState(prevState => ({
  //     timer: prevState.timer + 1
  //   }));
  // }

  handleHeartClick(post) {
    // debugger;
    return () => {
      // console.log(post.id);
      if(!post.likers.includes(this.props.sessionId)) {
        // instantiate a new like object into back-end
        // add my session id to post.likers
        // change heart color to red.
        this.props.likePost({
          user_id: this.props.sessionId,
          post_id: post.id,
        });

        post.likers.push(this.props.sessionId);
      }
      else {
        // delete like object from back-end (somehow gotta find a way to get the like-id)
        // remove my session id from post.likers
        // change heart back to white.
        // this.props.unlikePost(this.props.allLikes[]);
          
        const session_index = post.likers.indexOf(this.props.sessionId);
        post.likers = post.likers.slice(0, session_index).concat(post.likers.slice(session_index + 1));
      }
    };
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
                  {/* <div className={this.state.heartStatus} onClick={this.handleHeartClick(post.id)}><i className="far fa-heart"></i></div>
                  <div className={this.state.heart2Status} onClick={this.handleHeartClick(post.id)}><i className="fas fa-heart red-heart"></i></div> */}
                  <div className={post.likers.includes(this.props.sessionId) ? "heart-hide" : "heart-show"} onClick={this.handleHeartClick(post)}><i className="far fa-heart"></i></div>
                  <div className={post.likers.includes(this.props.sessionId) ? "heart-show" : "heart-hide"} onClick={this.handleHeartClick(post)}><i className="fas fa-heart red-heart"></i></div>
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

              <div className="post-likes">
                { post.likers.length === 0 ? (<span>Be the first to <b>like this</b></span>) : post.likers.length === 1 ? `${post.likers.length} like` : `${post.likers.length} likes` }
              </div>

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
