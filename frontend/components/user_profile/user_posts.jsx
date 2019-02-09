import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { formatTime } from '../../utils/date_util';

import UserPostComments from './user_post_comments';
import UserPostCommentsContainer from './user_post_comments_container';

export default class UserPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: this.props.sessionId,
      modalOpen: false, 
      modalOpen2: false, 
      modalOpen3: false, 
      photoId: null,
      photoCaption: null,
      photoUserId: null,
      photoURL: null, 
      post_likers: [],
      createdAt: null,
      heartStatus: "photo-show-heart",
      heart2Status: "photo-hide-heart",
      bookmarkStatus: "photo-show-bookmark",
      bookmark2Status: "photo-hide-bookmark",
      comment: "",
      comments: [],
    };

    this.handlePostClick = this.handlePostClick.bind(this);
    this.handleHeartClick = this.handleHeartClick.bind(this);
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.onModalClose2 = this.onModalClose2.bind(this);
    this.onModalClose3 = this.onModalClose3.bind(this);
    this.modalCeption = this.modalCeption.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.openEditPostModal = this.openEditPostModal.bind(this);
    this.handleEditPostChange = this.handleEditPostChange.bind(this);
    this.handleFormEditSubmit = this.handleFormEditSubmit.bind(this);
    this.spanLike = this.spanLike.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
  }
  
  componentDidMount() {
    this.props.users();
    this.props.posts();
    this.props.likes();
    this.props.getComments();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userPosts.length !== this.props.userPosts.length) {
      this.props.posts();
    }

    if (prevProps.allComments.length !== this.props.allComments.length) {
      this.props.getComments();
      this.props.posts();
    }
  }
  
  handlePostClick(post) {
    return () => {
      this.setState({ 
        modalOpen: true, 
        photoId: post.id, 
        photoCaption: post.caption, 
        photoUserId: post.user_id, 
        photoURL: post.photoURL, 
        post_likers: post.likers,
        createdAt: post.created_at,
        comments: post.comment_objects,
      });
    };
  }

  modalCeption() {
    this.setState({ modalOpen2: true });
  }

  openEditPostModal() {
    this.setState({ modalOpen3: true });
  }

  onModalClose() {
    this.setState({ modalOpen: false });
  }
  
  onModalClose2() {
    this.setState({ modalOpen2: false });
  }

  onModalClose3() {
    this.setState({ modalOpen3: false });
  }

  handleHeartClick() {
    if (!this.state.post_likers.includes(this.props.sessionId)) {
      // instantiate a new like object into back-end
      // add my session id to post.likers
      // change heart color to red.
      this.props.likePost({
        user_id: this.props.sessionId,
        post_id: this.state.photoId,
      }); 

      this.state.post_likers.push(this.props.sessionId);
    }
    else {
      // delete like object from back-end (somehow gotta find a way to get the like-id)
      // remove my session id from post.likers
      // change heart back to white.
      // this.props.unlikePost(this.props.allLikes[]);
      const likesArr = Object.values(this.props.allLikes);
      likesArr.forEach(like => {
        if (like.user_id === this.state.sessionId) this.props.unlikePost(like.id);
      });

      const user_id = this.state.post_likers.indexOf(this.state.sessionId);
      this.state.post_likers.splice(user_id, 1);
    }
  }

  handleBookmarkClick() {
    if (this.state.bookmarkStatus === "photo-show-bookmark" && this.state.bookmark2Status === "photo-hide-bookmark") {
      this.setState({ bookmarkStatus: "photo-hide-bookmark", bookmark2Status: "photo-show-bookmark" });
    }
    else {
      this.setState({ bookmarkStatus: "photo-show-bookmark", bookmark2Status: "photo-hide-bookmark" });
    }
  }

  handleDeletePost(id) {
    return () => {
      this.props.deletePost(id);
      this.onModalClose();
      this.onModalClose2();
    };
  }

  handleEditPostChange(event) {
    this.setState({ photoCaption: event.currentTarget.value });
  }

  handleFormEditSubmit(event) {
    event.preventDefault();
    this.props.editPost({
      id: this.state.photoId,
      caption: this.state.photoCaption,
      user_id: this.state.photoUserId,
    });
    this.onModalClose3();
    this.onModalClose2();
  }

  spanLike() {
    return this.handleHeartClick();
  }

  handleCommentChange(event) {
    this.setState({ comment: event.currentTarget.value });
  }

  handleCommentSubmit(event) {
    event.preventDefault();
    this.props.makeComment({
      comment: this.state.comment,
      post_id: this.state.photoId,
      // user_id: this.state.photoUserId,
      user_id: this.props.sessionId,
    });
    this.setState({ comment: "" });
  }

  handleCommentDelete(commentId) {
    return () => this.props.removeComment(commentId);
  }
  
  render() {
    // NOTE TO SELF: Find a more efficient way to go about this.
      // Below method is very bad because O(n) will increase dramatically
      // as the number of posts by users increases.
      // It's okay in the scope of this project, but not in the scope of a
      // real application.
        // Solution: use an association: Users have many posts.

    const posts = this.props.userPosts.map((post, index) => {
      if (post.user_id === this.props.user_id) {
        return (
          <div className="user-post-photo" key={index}>
            <img src={ post.photoURL } alt="photo" onClick={ this.handlePostClick(post) } />
          </div>
        )
      }
    });

    // const posts = this.props.posts.map((post, index) => {
    //   return (
    //     <div className="user-post-photo" key={`userpost-${index}`}>
    //       <img src={ post.photoURL } alt="photo" onClick={ this.handlePostClick(post) }/>
    //     </div>
    //   )
    // });

    let commentLis;
    if (this.state.comments) {
      commentLis = Object.values(this.state.comments).map((commentObject, index) => {
        return <li key={`comment-${index}`}><b>{this.props.currentUser.username}</b> <span className="comment-li" onClick={this.handleCommentDelete(commentObject.id)}>{commentObject.comment}</span></li>
      });
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
        borderRadius: 0,
        width: "935px",
        height: "602px",
        margin: "auto",
        padding: "0",
        backgroundColor: "transparent",
        border: "none",
      }
    };

    const modalStyle2 = {
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
        height: "246px",
        margin: "auto",
        borderRadius: "12px",
        padding: 0,
        border: "white solid 0px",
        animation: "postEditDeleteModal 0.05s linear",
      }
    };

    const modalStyle3 = {
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
        width: "602px",
        height: "400px",
        margin: "auto",
        borderRadius: "5px",
      }
    };
    
    return (
      <div className="user-posts">
        { posts }
        <Modal isOpen={ this.state.modalOpen } onRequestClose={ this.onModalClose } style={ modalStyle } >
          <div className="photo-modal" onDoubleClick={this.handleHeartClick}>
            <div className="photo-modal-picture">
              <img className="photo-modal-picture-image" src={ this.state.photoURL } alt="photo"/>
            </div>

            <div className="photo-modal-data">
              {/* <div className="user-photo"><img src={window.userDefaultProfilePicture} alt="user-profile-picture" /> &nbsp;</div> */}
              {/* <div className="photo-modal-username" onClick={this.onModalClose}><div><span className="photo-modal-username-span">{ this.props.currentUser.username }</span></div></div> */}
              <div className="photo-modal-username">
                <div>
                  <div className="photo-modal-user-photo"><img src={window.userDefaultProfilePicture} alt="user-profile-picture" /></div>
                  &nbsp; &nbsp; 
                  <span className="photo-modal-username-span" onClick={this.onModalClose}><b>{ this.props.allUsers[this.props.user_id] ? this.props.allUsers[this.props.user_id].username : this.props.allUsers[this.props.sessionId].username }</b></span>
                </div>
              </div>
              {/* <div className="photo-modal-username"><div>{ <Link to={`/users/${this.props.user_id}`}>{this.props.currentUser.username}</Link> }</div></div> */}

              <div className="photo-modal-caption-holder">
                <div className="photo-modal-caption">
                  <div className="photo-modal-caption-caption"><span onClick={this.onModalClose}>{this.props.allUsers[this.props.user_id] ? this.props.allUsers[this.props.user_id].username : this.props.allUsers[this.props.sessionId].username} </span> {this.state.photoCaption}</div>
                  {/* <div><span>{this.props.currentUser.username} </span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error voluptatibus, aliquid sit porro ex eos unde quaerat perspiciatis id suscipit pariatur laborum facere doloremque vitae reprehenderit alias, harum accusamus fugiat qui quos! Perferendis omnis error magnam officiis iste numquam deserunt quisquam, illum beatae ullam ratione expedita nobis ut dolores possimus. Ipsum enim vero distinctio, aspernatur ad hic facilis velit sint in natus rem adipisci. Natus tempore sed alias possimus molestias iste temporibus consequuntur iusto explicabo. Facilis nulla autem iure, reiciendis, vero animi ad maxime quidem porro mollitia molestias tempore! Tempore officiis maxime hic, commodi nulla corrupti, error ea reprehenderit officia temporibus quia quaerat aut vero minus, exercitationem perferendis. Repellat dolorem culpa voluptatum, illum doloribus harum molestiae adipisci quidem! Necessitatibus nisi culpa asperiores quaerat id perferendis, ipsum, doloribus aliquid animi suscipit similique hic repudiandae, autem modi reprehenderit blanditiis reiciendis totam accusamus? Officiis architecto aut consequuntur odio commodi. Dignissimos, cum. Delectus omnis sit velit ad nulla, autem quos impedit. Mollitia, enim quisquam sit exercitationem ullam autem quos ducimus omnis consectetur quidem nihil asperiores officiis laborum, corporis eligendi architecto obcaecati doloribus. Earum nemo repellat illum deleniti adipisci suscipit explicabo molestias, expedita, blanditiis beatae aliquam iste ab eum labore laborum optio veritatis voluptatibus similique, recusandae iure quae. Velit aut, sequi est accusamus possimus placeat omnis consequuntur eligendi dolores atque, at consequatur sunt quo impedit dolor beatae. Nemo est quos ipsa ratione mollitia quis, molestiae dicta facilis sit molestias culpa odio velit illum eum minus praesentium rem totam maiores adipisci. Obcaecati voluptas deleniti illo vero itaque? Laudantium animi soluta dicta mollitia deserunt distinctio! Modi, amet distinctio! Exercitationem ratione placeat quaerat, non quae molestiae nulla praesentium! Non, quos nam! Sequi ullam quasi enim mollitia voluptatibus. Odio accusantium totam sint placeat adipisci, recusandae cupiditate dolorem corrupti magnam aut. Qui, quam voluptate? Totam, cumque. Repellendus veritatis soluta maxime.</div> */}
                  {/* <div className="photo-modal-caption-comments">
                    <ul>
                      {commentLis}
                    </ul>
                  </div> */}
                  <UserPostCommentsContainer postId={this.state.photoId} comments={this.state.comments} username={this.props.allUsers[this.props.sessionId].username} modalClose={this.onModalClose} />
                  {/* <UserPostComments comments={this.state.comments} username={this.props.currentUser.username} /> */}
                </div>
              </div>

              <div className="photo-modal-data-bottom">
                <div className="photo-modal-like-comment">
                  <div className="user-posts-heart-icon">
                    {/* <div className={this.state.post_likers.includes(this.props.sessionId) ? "heart-hide" : "heart-show"} onClick={this.handleHeartClick}><i className="far fa-heart"></i></div>
                    <div className={this.state.post_likers.includes(this.props.sessionId) ? "heart-show" : "heart-hide"} onClick={this.handleHeartClick}><i className="fas fa-heart red-heart"></i></div> */}
                    <div className={this.state.post_likers.includes(this.props.sessionId) ? "heart-hide" : "heart-show"} onClick={this.handleHeartClick}><img className="user-post-heart-icon" src={window.heart_white} alt="heart"/></div>
                    <div className={this.state.post_likers.includes(this.props.sessionId) ? "heart-show" : "heart-hide"} onClick={this.handleHeartClick}><img className="user-post-heart2-icon" src={window.heart_red} alt="heart2"/></div>

                    <div>
                      <label htmlFor="show-post-comment">
                        {/* <i className="far fa-comment"></i> */}
                        <img className="user-post-bubble-icon" src={window.bubble} alt="bubble"/>
                      </label>
                    </div>
                  </div>

                  <div className="user-posts-bookmark-icon">
                    {/* <div className={this.state.bookmarkStatus} onClick={this.handleBookmarkClick}><i className="far fa-bookmark"></i></div>
                    <div className={this.state.bookmark2Status} onClick={this.handleBookmarkClick}><i className="fas fa-bookmark"></i></div> */}
                    <div className={this.state.bookmarkStatus} onClick={this.handleBookmarkClick}><img className="user-post-bookmark-icon" src={window.bookmark} alt="bookmark"/></div>
                    <div className={this.state.bookmark2Status} onClick={this.handleBookmarkClick}><img className="user-post-bookmark2-icon" src={window.bookmark2} alt="bookmark2"/></div>
                  </div>
                </div>
                
                <div className="photo-modal-number-likes">
                  {this.state.post_likers.length === 0 ? (<span>Be the first to <span className="first-to-like-this" onClick={this.spanLike}>like this</span></span>) : this.state.post_likers.length === 1 ? `${this.state.post_likers.length} like` : `${this.state.post_likers.length} likes`}
                </div>
                
                {/* <div className="photo-modal-post-date">
                  when it was posted
                </div> */}

                <div className="photo-modal-post-date"><a href="#">{formatTime(this.state.createdAt)}</a></div>

                <div className="photo-modal-comment-and-modal">
                  <div>
                    <form className="photo-modal-comment-form" onSubmit={this.handleCommentSubmit}>
                      <input id="show-post-comment" placeholder="Add a comment..." onChange={this.handleCommentChange} value={this.state.comment}/>
                    </form>
                    <span className="photo-modal-span" onClick={this.modalCeption}>...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal isOpen={this.state.modalOpen2} onRequestClose={this.onModalClose2} style={modalStyle2}>
          <div className="user-posts-modal-ception">
            <div><a href="https://github.com/lk340" target="_bla{ nk}" >Github</a></div>
            <div><a href="https://www.linkedin.com/in/loyd-k-b58176166/" target="_blank">LinkedIn</a></div>
            {/* <div><a href="https://www.instagram.com/" target="_blank">Instagram</a></div> */}
            {/* <div className="user-post-edit-post"><Link to="/posts/edit" target="_blank">Edit Post</Link></div> */}
            <div className="user-post-edit-post" onClick={this.openEditPostModal}>Edit Post Caption</div>
            {/* <div onClick={this.handleDeletePost(this.state.photoId)} ><a className="user-post-delete-post" href="#" target="_blank">Delete Post</a></div> */}
            <div className="user-post-delete-post" onClick={this.handleDeletePost(this.state.photoId)}>Delete Post</div>
            <div><a onClick={this.onModalClose2}>Cancel</a></div>
          </div>
        </Modal>

        <Modal isOpen={this.state.modalOpen3} onRequestClose={this.onModalClose3} style={modalStyle3} >
          <div className="edit-post-form">
            <form onSubmit={this.handleFormEditSubmit}>
              <label htmlFor="edit-post-caption">Caption</label>
              <br/>
              <textarea type="text" id="edit-post-caption" value={this.state.photoCaption} onChange={this.handleEditPostChange} />
              <br/>
              <button type="submit">Edit Post</button>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

// photoURL: null,
// photoCaption: null,
// photoId: null,