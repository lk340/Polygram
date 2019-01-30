import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

export default class UserPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false, 
      modalOpen2: false, 
      modalOpen3: false, 
      photoId: null,
      photoCaption: null,
      photoUserId: null,
      photoURL: null, 
      heartStatus: "photo-show-heart",
      heart2Status: "photo-hide-heart",
      bookmarkStatus: "photo-show-bookmark",
      bookmark2Status: "photo-hide-bookmark",
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
  }
  
  componentDidMount() {
    this.props.posts();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userPosts.length !== this.props.userPosts.length) {
      this.props.posts();
    }
  }
  
  handlePostClick(post) {
    return () => {
      this.setState({ modalOpen: true, photoId: post.id, photoCaption: post.caption, photoUserId: post.user_id, photoURL: post.photoURL });
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
    if (this.state.heartStatus === "photo-show-heart" && this.state.heart2Status === "photo-hide-heart") {
      this.setState({ heartStatus: "photo-hide-heart", heart2Status: "photo-show-heart" });
    }
    else {
      this.setState({ heartStatus: "photo-show-heart", heart2Status: "photo-hide-heart" });
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
  
  render() {
    // NOTE TO SELF: Find a more efficient way to go about this.
      // Below method is very bad because O(n) will increase dramatically
      // as the number of posts by users increases.
      // It's okay in the scope of this project, but not in the scope of a
      // real application.

    const posts = this.props.userPosts.map((post, index) => {
      if (post.user_id === this.props.sessionId) {
        return (
          <div className="user-post-photo" key={index}>
            <img src={ post.photoURL } alt="photo" onClick={ this.handlePostClick(post) } />
          </div>
        )
      }
    });
    
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
        height: "600px",
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
        
      }
    };
    
    return (
      <div className="user-posts">
        { posts }
        <Modal isOpen={ this.state.modalOpen } onRequestClose={ this.onModalClose } style={ modalStyle } >
          <div className="photo-modal">
            <div className="photo-modal-picture">
              <img className="photo-modal-picture-image" src={ this.state.photoURL } alt="photo"/>
            </div>

            <div className="photo-modal-data">
              <div className="photo-modal-username"><div>{ this.props.currentUser.username }</div></div>

              <div className="photo-modal-caption-holder">
                <div className="photo-modal-caption">
                  <div><span>{this.props.currentUser.username} </span> {this.state.photoCaption}</div>
                  <div className="photo-modal-caption-comments"><b>[Commenter Username]</b> Comments go here</div>
                </div>
              </div>

              <div className="photo-modal-data-bottom">
                <div className="photo-modal-like-comment">
                  <div className="user-posts-heart-icon">
                    <div className={this.state.heartStatus} onClick={this.handleHeartClick}><i className="far fa-heart"></i></div>
                    <div className={this.state.heart2Status} onClick={this.handleHeartClick}><i className="fas fa-heart red-heart"></i></div>

                    <div>
                      <label htmlFor="show-post-comment">
                        <i className="far fa-comment"></i>
                      </label>
                    </div>
                  </div>

                  <div className="user-posts-bookmark-icon">
                    <div className={this.state.bookmarkStatus} onClick={this.handleBookmarkClick}><i className="far fa-bookmark"></i></div>
                    <div className={this.state.bookmark2Status} onClick={this.handleBookmarkClick}><i className="fas fa-bookmark"></i></div>
                  </div>
                </div>
                
                <div className="photo-modal-number-likes">
                  Be the first to <b>like this</b>
                  {/* 
                    REMINDER: if there are no likes yet, show "be the first to like this".
                    Otherwise, do something like: (likes.count > 1 || likes.count === 0) ? "Likes" : "Like";
                  */}
                </div>
                
                <div className="photo-modal-post-date">
                  when it was posted
                </div>

                <div className="photo-modal-comment-and-modal">
                  <div>
                    <textarea id="show-post-comment" placeholder="Add a comment..."></textarea>
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
            <div><a href="#" target="_blank">LinkedIn</a></div>
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
              <input type="file"/>
              <br/>
              <label htmlFor="edit-post-caption">Caption</label>
              <br/>
              <input type="text" id="edit-post-caption" value={this.state.photoCaption} onChange={this.handleEditPostChange} />
              <br/>
              <button type="submit">Change Caption</button>
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