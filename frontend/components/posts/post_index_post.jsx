import React from 'react';

import { timeSince } from '../../utils/date_util';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { debounce } from 'lodash';

import CommentsContainer from '../comments/comments_container';

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
      postDeleteSpan: "post-delete-span-hide",
      commentsHidden: false,
      numberComments: this.props.post.comment_objects ? Object.values(this.props.post.comment_objects): null,
      toggleCommentsShow: true,
    };

    this.handleHeartClick = this.handleHeartClick.bind(this);
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.spanLike = this.spanLike.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);

    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalClose = this.onModalClose.bind(this);

    this.handleCommentMouseOver = this.handleCommentMouseOver.bind(this);
    this.handleCommentMouseLeave = this.handleCommentMouseLeave.bind(this);
    this.handleShowComments = this.handleShowComments.bind(this);
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
  
    if(prevProps.allComments.length !== this.props.allComments.length) {
      this.props.posts();
      this.props.getComments();
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
      if (this.state.comment !== "") {
        this.props.makeComment({
          comment: this.state.comment,
          post_id: post.id,
          user_id: this.props.currentUser.id,
        });
      }
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

  handleCommentMouseOver() {
    this.setState({ postDeleteSpan: "post-delete-span" });
  }

  handleCommentMouseLeave() {
    this.setState({ postDeleteSpan: "post-delete-span-hide" });
  }

  handleShowComments() {
    const {comment_objects} = this.props.post;
    if (comment_objects) {
      const postCommentArray = Object.values(comment_objects);
        for (let i = 0; i < postCommentArray.length; i++) {
          if (document.getElementById(`${postCommentArray[i].id}`)) {
            const commentClass = document.getElementById(`${postCommentArray[i].id}`).classList;
            if (commentClass[0] === "hide-comment") {
              commentClass.remove("hide-comment");
              commentClass.add("comment");
            }
          }
        }
    }
    
    this.setState({ toggleCommentsShow: false });
  }
  
  render() {
    let commentLis;
    if (this.props.allUsers[this.props.post.user_id]) {
      if (this.props.post.comment_objects) {
        commentLis = Object.values(this.props.post.comment_objects).map((commentObject, commentIndex) => {
          // debugger;
          return <CommentsContainer key={`comment-${commentIndex}`} allUsers={this.props.allUsers} commentObject={commentObject} style={{ transitionDuration: "0.4s"}} />
          // return <li key={`comment-${commentIndex}`}><b>{this.props.allUsers[commentObject.user_id].username}</b> <span className="comment-li" onClick={this.handleCommentDelete(commentObject)}>{commentObject.comment}</span></li>
          // return (
          //   <li key={`comment-${commentIndex}`}>
          //     <b>{
          //       <Link className="profile-link" to={`/users/${this.props.allUsers[commentObject.user_id].id}`}>
          //         {this.props.allUsers[commentObject.user_id].username}</Link>
          //     }</b>
          //     &nbsp;<span className="comment-li" onMouseEnter={this.handleCommentMouseOver} onMouseLeave={this.handleCommentMouseLeave} onClick={this.handleCommentDelete(commentObject)}>{commentObject.comment}</span>
          //     &nbsp;<span className={this.state.postDeleteSpan}>delete?</span>
          //   </li>
          // )
        });
      }
    }

    if (this.props.post.comment_objects && this.state.toggleCommentsShow) {
      const postCommentArray = Object.values(this.props.post.comment_objects);
      if (postCommentArray.length > 4) {
        for (let i = 0; i < postCommentArray.length - 4; i++) {
          if (document.getElementById(`${postCommentArray[i].id}`)) {
            const commentClass = document.getElementById(`${postCommentArray[i].id}`).classList;
            if (commentClass[0] === "comment") {
              commentClass.remove("comment");
              commentClass.add("hide-comment");
            }
          }
        };
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
        // height: "146px",
        height: "293px",
        margin: "auto",
        borderRadius: "12px",
        padding: 0,
        border: "white solid 0px",
        animation: "postEditDeleteModal 0.05s linear",
      }
    };

    let commentShowText;
    //this.state.numberComments ? `View all ${this.state.numberComments.length} comments` : null
    if (this.state.numberComments) {
      if (this.state.numberComments.length > 4) {
        commentShowText = `View all ${this.state.numberComments.length} comments`;
      }
    }
    else commentShowText = null;
    
    return (
      <div className="post-container">
        <div className="post-top">
          {/* <div className="user-photo">[ userphoto size 30x30 border-radius 50% on image ] &nbsp;</div> */}
          <div className="user-photo">
            {/* <img src={window.userDefaultProfilePicture} alt="user-profile-picture" /> &nbsp; */}
            { this.props.allUsers[this.props.post.user_id].username === "demoUser" ? <img src={window.userProPic} alt="profile-photo"/> : this.props.allUsers[this.props.post.user_id].username === "google" ? <img src={window.google} alt="profile-photo"/> : this.props.allUsers[this.props.post.user_id].username === "microsoft" ? <img src={window.microsoft} alt="profile-photo"/> : this.props.allUsers[this.props.post.user_id].username === "apple" ? <img src={window.apple} alt="profile-photo"/> : <img src={window.userDefaultProfilePicture} alt="profile-photo"/> } &nbsp;
          </div>
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
            {/* <div className={this.props.post.likers.includes(this.props.sessionId) ? "heart-hide" : "heart-show"} onClick={this.handleHeartClick(this.props.post)}><i className="far fa-heart"></i></div>
            <div className={this.props.post.likers.includes(this.props.sessionId) ? "heart-show" : "heart-hide"} onClick={this.handleHeartClick(this.props.post)}><i className="fas fa-heart red-heart"></i></div> */}
            <div className={this.props.post.likers.includes(this.props.sessionId) ? "heart-hide" : "heart-show"} onClick={this.handleHeartClick(this.props.post)}><img className="post-index-post-heart-icon" src={window.heart_white} alt="heart"/></div>
            <div className={this.props.post.likers.includes(this.props.sessionId) ? "heart-show" : "heart-hide"} onClick={this.handleHeartClick(this.props.post)}><img className="post-index-post-heart2-icon" src={window.heart_red} alt="heart2"/></div>
            <div>

              <label htmlFor={`index-comment-${this.props.index}`}>
                {/* <i className="far fa-comment"></i> */}
                <img className="post-index-post-bubble-icon" src={window.bubble} alt="bubble"/>
              </label>

            </div>
            <div></div>
          </div>

          {/* <div className={this.state.bookmarkStatus} onClick={this.handleBookmarkClick} ><i className="far fa-bookmark"></i></div>
          <div className={this.state.bookmark2Status} onClick={this.handleBookmarkClick} ><i className="fas fa-bookmark"></i></div> */}
          <div className={this.state.bookmarkStatus} onClick={this.handleBookmarkClick} ><img className="post-index-post-bookmark-icon" src={window.bookmark} alt="bookmark"/></div>
          <div className={this.state.bookmark2Status} onClick={this.handleBookmarkClick} ><img className="post-index-post-bookmark2-icon" src={window.bookmark2} alt="bookmark2"/></div>
        </div>

        <div className="post-likes">
          { this.props.post.likers.length === 0 ? (<span>Be the first to <span className="first-to-like-this" onClick={this.spanLike(this.props.post)}>like this</span></span>) : this.props.post.likers.length === 1 ? `${this.props.post.likers.length} like` : `${this.props.post.likers.length} likes` }
        </div>

        <div className="post-caption">
          {/* <span className="post-username-span"> {this.props.allUsers[this.props.post.user_id].username} </span> {this.props.post.caption} */}
          <span className="post-username-span"> {<Link className="profile-link" to={`/users/${this.props.allUsers[this.props.post.user_id].id}`}>{this.props.allUsers[this.props.post.user_id].username}</Link>} </span> {this.props.post.caption}
        </div>

        <div className="show-all-comments">
          <div className={ this.state.toggleCommentsShow === true ? "show-comment-button" : "hide-comment-button" } onClick={this.handleShowComments}>{ commentShowText }</div>
        </div>

        <div className="post-index-comments">
          <ul>
            {commentLis}
          </ul>
        </div>

        {/* <div className="post-index-timestamp"><a href="#">{formatTime(this.props.post.created_at)}</a></div> */}
        <div className="post-index-timestamp"><a href="#">{timeSince(new Date(this.props.post.created_at))} Ago</a></div>

        <div className="post-index-comment-container">
          <div className="post-index-comment">
            <form className="post-index-comment-form" onSubmit={this.handleCommentSubmit(this.props.post)}>
              {/* <textarea id="index-comment" placeholder="Add a comment..." onChange={this.handleCommentChange}></textarea> */}
              <input id={`index-comment-${this.props.index}`} placeholder="Add a comment..." onChange={this.handleCommentChange} value={this.state.comment} ></input>
            </form>
          </div>
          <span onClick={this.onModalOpen}>...</span>
        </div>

        <Modal isOpen={this.state.modalOpen} onRequestClose={this.onModalClose} style={modalStyle}>
          <div className="post-index-post-modal">
            <div><a href="http://www.loydkim.com/" target="_blank">Website</a></div>
            <div><a href="https://github.com/lk340" target="_blank" >GitHub</a></div>
            <div><a href="https://www.linkedin.com/in/loyd-k-b58176166/" target="_blank">LinkedIn</a></div>
            <div><a href="https://angel.co/loyd-kim-1?al_content=view+your+profile&al_source=transaction_feed%2Fnetwork_sidebar" target="_blank">Angel-List</a></div>
            <div><a href="https://www.instagram.com/" target="_blank">Instagram</a></div>
            <div><a onClick={this.onModalClose}>Cancel</a></div>
          </div>
        </Modal>
      </div>
    )
  }
}
