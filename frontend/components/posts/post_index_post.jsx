import React from 'react';

import { formatTime } from '../../utils/date_util';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

export default class PostIndexPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heartStatus: "heart-show", 
      heart2Status: "heart-hide",
      bookmarkStatus: "bookmark-show",
      bookmark2Status: "bookmark-hide",
      comment: "",
      comments: [],
      modalOpen: false,
    };

    this.handleHeartClick = this.handleHeartClick.bind(this);
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.spanLike = this.spanLike.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);

    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }
  
  componentDidMount() {
    this.props.users();
    this.props.likes();
    this.props.posts();
    this.props.getComments();
  }
  
  componentDidUpdate(prevProps) {
    if ((prevProps.allPosts.length !== this.props.allPosts.length) || (prevProps.allComments.length !== this.props.allComments.length)) {
      this.props.getComments();
      this.props.posts();
    }
  }
  onModalOpen() {
    this.setState({ modalOpen: true });
  }
  
  onModalClose() {
    this.setState({ modalOpen: false });
  }
  
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
    return (event) => {
      event.preventDefault();
      this.props.makeComment({
        comment: this.state.comment,
        post_id: post.id,
        user_id: this.props.currentUser.id,
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

  handleCommentDelete(commentObject) {
    if (commentObject.user_id === this.props.currentUser.id) {
      return () => {
        this.props.removeComment(commentObject.id);
      };
    }
  }

  handleDeletePost(id) {
    return () => {
      this.props.deletePost(id);
      this.onModalClose();
    };
  }

  render() {
    let commentLis;
    if (this.props.allUsers[this.props.post.user_id]) {
      if (this.props.post.comment_objects) {
        commentLis = Object.values(this.props.post.comment_objects).map((commentObject, commentIndex) => {
          // return <li key={`comment-${commentIndex}`}><b>{this.props.allUsers[commentObject.user_id].username}</b> <span className="comment-li" onClick={this.handleCommentDelete(commentObject)}>{commentObject.comment}</span></li>
          return <li key={`comment-${commentIndex}`}><b>{<Link className="profile-link" to={`/users/${this.props.allUsers[commentObject.user_id].id}`}>{this.props.allUsers[commentObject.user_id].username}</Link>}</b> <span className="comment-li" onClick={this.handleCommentDelete(commentObject)}>{commentObject.comment}</span></li>
        });
      }
    }

    const modalStyle = {
      overlay: {
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 99999,
      },
      content: {
        width: "400px",
        height: "146px",
        margin: "auto",
        borderRadius: "12px",
        padding: 0,
        border: "white solid 0px",
        animation: "postEditDeleteModal 0.05s linear",
      }
    };

    return (
      <div className="post-container">
        <div className="post-top">
          {/* <div className="user-photo">[ userphoto size 30x30 border-radius 50% on image ] &nbsp;</div> */}
          <div className="user-photo"><img src={window.userDefaultProfilePicture} alt="user-profile-picture" /> &nbsp;</div>
          {/* <div className="post-username">{this.props.allUsers[this.props.post.user_id].username}</div> */}
          <div className="post-username">{<Link className="profile-link" to={`/users/${this.props.allUsers[this.props.post.user_id].id}`}>{this.props.allUsers[this.props.post.user_id].username}</Link>}</div>
        </div>

        <div className="index-images">
          {/* <img src={window.likeHeart} alt="like-heart" className="index-like-heart-show" /> */}
          <img src={this.props.post.photoURL} className="index-post-image" onDoubleClick={this.handleHeartClick(this.props.post)} />
        </div>

        <div className="post-actions">
          <div className="post-like-comment">
            {/* <div className={this.state.heartStatus} onClick={this.handleHeartClick(post.id)}><i className="far fa-heart"></i></div>
            <div className={this.state.heart2Status} onClick={this.handleHeartClick(post.id)}><i className="fas fa-heart red-heart"></i></div> */}
            <div className={this.props.post.likers.includes(this.props.sessionId) ? "heart-hide" : "heart-show"} onClick={this.handleHeartClick(this.props.post)}><i className="far fa-heart"></i></div>
            <div className={this.props.post.likers.includes(this.props.sessionId) ? "heart-show" : "heart-hide"} onClick={this.handleHeartClick(this.props.post)}><i className="fas fa-heart red-heart"></i></div>
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
          { this.props.post.likers.length === 0 ? (<span>Be the first to <span className="first-to-like-this" onClick={this.spanLike(this.props.post)}>like this</span></span>) : this.props.post.likers.length === 1 ? `${this.props.post.likers.length} like` : `${this.props.post.likers.length} likes` }
        </div>

        <div className="post-caption">
          {/* <span className="post-username-span"> {this.props.allUsers[this.props.post.user_id].username} </span> {this.props.post.caption} */}
          <span className="post-username-span"> {<Link className="profile-link" to={`/users/${this.props.allUsers[this.props.post.user_id].id}`}>{this.props.allUsers[this.props.post.user_id].username}</Link>} </span> {this.props.post.caption}
        </div>

        <div className="post-index-comments">
          <ul>
            {commentLis}
          </ul>
        </div>

        <div className="post-index-timestamp"><a href="#">{formatTime(this.props.post.created_at)}</a></div>

        <div className="post-index-comment-container">
          <div className="post-index-comment">
            <form className="post-index-comment-form" onSubmit={this.handleCommentSubmit(this.props.post)}>
              {/* <textarea id="index-comment" placeholder="Add a comment..." onChange={this.handleCommentChange}></textarea> */}
              <input id="index-comment" placeholder="Add a comment..." onChange={this.handleCommentChange} value={this.state.comment} ></input>
            </form>
          </div>
          <span onClick={this.onModalOpen}>...</span>
        </div>

        <Modal isOpen={this.state.modalOpen} onRequestClose={this.onModalClose} style={modalStyle}>
          <div className="post-index-post-modal">
            <div><a href="https://github.com/lk340" target="_bla{ nk}" >Github</a></div>
            <div><a href="https://www.linkedin.com/in/loyd-k-b58176166/" target="_blank">LinkedIn</a></div>
            <div><a onClick={this.onModalClose}>Cancel</a></div>
          </div>
        </Modal>
      </div>
    )
  }
}
