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
      comment: "",
      comments: [],
    };

    this.handleHeartClick = this.handleHeartClick.bind(this);
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.spanLike = this.spanLike.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
  }
  
  componentDidMount() {
    this.props.users();
    this.props.likes();
    this.props.posts();
    this.props.getComments();
    // this.interval = setInterval(() => this.tick(), 1000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
  
  componentDidUpdate(prevProps) {
    if ((prevProps.allPosts.length !== this.props.allPosts.length) || (prevProps.allComments.length !== this.props.allComments.length)) {
      this.props.getComments();
      this.props.posts();
    }
  }

  // tick() {
  //   this.setState(prevState => ({
  //     timer: prevState.timer + 1
  //   }));
  // }

  handleHeartClick(post) {
    return () => {
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
        const likesArr = Object.values(this.props.allLikes);
        likesArr.forEach(like => {
          if (like.user_id === this.props.sessionId) this.props.unlikePost(like.id);
        });
        
        const user_id = post.likers.indexOf(this.props.sessionId);
        post.likers.splice(user_id, 1);
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

  handleCommentSubmit(post) {
    // debugger;
    return (event) => {
      event.preventDefault();
      // debugger;
      this.props.makeComment({
        comment: this.state.comment,
        post_id: post.id,
        user_id: post.user_id,
      });
      this.setState({ comment: "" });
    };
  }
  
  spanLike(post) {
    return this.handleHeartClick(post);
  }

  handleCommentChange(event) {
    this.setState({ comment: event.currentTarget.value });
  }

  handleCommentDelete(commentId) {
    return () => {
      this.props.removeComment(commentId);
    };
  }
  
  render() {
    let posts;
    let commentLis;
    // if ((Object.keys(this.props.allUsers).length > 1) && (this.props.currentURL === "/")) {
    if ((this.props.currentUser) && (this.props.currentURL === "/")) {
      posts = this.props.allPosts.map((post, index) => {

        if (this.props.allUsers[post.user_id]) {
          // debugger;
          if (post.comment_objects) {
            commentLis = Object.values(post.comment_objects).map((commentObject, index) => {
              return <li key={`comment-${index}`}><b>{this.props.currentUser.username}</b> <span className="comment-li" onClick={this.handleCommentDelete(commentObject.id)}>{commentObject.comment}</span></li>
            });
          }

          return (
            <div className="post-container" key={index}>
              <div className="post-top">
                {/* <div className="user-photo">[ userphoto size 30x30 border-radius 50% on image ] &nbsp;</div> */}
                <div className="user-photo"><img src={window.userDefaultProfilePicture} alt="user-profile-picture" /> &nbsp;</div>
                <div className="post-username">{this.props.allUsers[post.user_id].username}</div>
              </div>

              <div className="index-images">
                {/* <img src={window.likeHeart} alt="like-heart" className="index-like-heart-show" /> */}
                <img src={post.photoURL} className="index-post-image" onDoubleClick={this.handleHeartClick(post)} />
              </div>

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
                { post.likers.length === 0 ? (<span>Be the first to <span className="first-to-like-this" onClick={this.spanLike(post)}>like this</span></span>) : post.likers.length === 1 ? `${post.likers.length} like` : `${post.likers.length} likes` }
              </div>

              <div className="post-caption" key={`post-${index}`}>
                <span className="post-username-span"> {this.props.allUsers[post.user_id].username} </span> {post.caption}
              </div>

              <div className="post-index-comments">
                <ul>
                  {commentLis}
                </ul>
              </div>

              <div className="post-index-timestamp"><a href="#">{formatTime(post.created_at)}</a></div>

              <div className="post-index-comment-container">
                <div className="post-index-comment">
                  <form className="post-index-comment-form" onSubmit={this.handleCommentSubmit(post)}>
                    {/* <textarea id="index-comment" placeholder="Add a comment..." onChange={this.handleCommentChange}></textarea> */}
                    <input id="index-comment" placeholder="Add a comment..." onChange={this.handleCommentChange} value={this.state.comment}></input>
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
