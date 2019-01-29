import React from 'react';
import Modal from 'react-modal';

export default class UserPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false, 
      photoURL: null, 
      photoCaption: null,
      heartStatus: "photo-show-heart",
      heart2Status: "photo-hide-heart",
      bookmarkStatus: "photo-show-bookmark",
      bookmark2Status: "photo-hide-bookmark",
    };

    this.handleClick = this.handleClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.handleHeartClick = this.handleHeartClick.bind(this);
    this.handleBookmarkClick = this.handleBookmarkClick.bind(this);
  }
  
  componentDidMount() {
    this.props.posts();
  }
  
  handleClick(post) {
    // debugger;
    return () => {
      this.setState({ modalOpen: true, photoURL: post.photoURL, photoCaption: post.caption });
    };
  }

  onModalClose() {
    this.setState({ modalOpen: false });
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
            <img src={ post.photoURL } alt="photo" onClick={ this.handleClick(post) } />
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

                    <div><i class="far fa-comment"></i></div>
                  </div>

                  <div className="user-posts-bookmark-icon">
                    <div className={this.state.bookmarkStatus} onClick={this.handleBookmarkClick}><i className="far fa-bookmark"></i></div>
                    <div className={this.state.bookmark2Status} onClick={this.handleBookmarkClick}><i className="fas fa-bookmark"></i></div>
                  </div>
                </div>
                <div className="photo-modal-number-likes">number likes</div>
                <div className="photo-modal-post-date">when it was posted</div>

                <div className="photo-modal-comment-and-modal">
                  <div>
                    <textarea placeholder="Add a comment..."></textarea>
                    <span>...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
