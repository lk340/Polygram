import React from 'react';
import Modal from 'react-modal';

export default class UserPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false }

    this.handleClick = this.handleClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }
  
  componentDidMount() {
    this.props.posts();
  }
  
  handleClick() {
    this.setState({ modalOpen: true });
  }

  onModalClose() {
    this.setState({ modalOpen: false });
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
            <img src={ post.photoURL } alt="photo" onClick={ this.handleClick } />
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
      }
    };
    
    return (
      <div className="user-posts">
        { posts }
        <Modal isOpen={ this.state.modalOpen } onRequestClose={ this.onModalClose } style={ modalStyle } >
          <div className="photo-modal">
            <div className="photo-modal-picture">
              
            </div>

            <div className="photo-modal-data">
              <div className="photo-modal-username">{ this.props.currentUser.username }</div>
              <div className="photo-modal-divider">divider</div>
              <div className="photo-modal-caption">username and caption (need to have scrolling)</div>
              <div className="photo-modal-divider">divider</div>
              <div className="photo-modal-like-comment">like comment share favorite</div>
              <div className="photo-modal-number-likes">number likes</div>
              <div className="photo-modal-post-date">when it was posted</div>
              <div className="photo-modal-divider">divider</div>
              <div className="photo-modal-comment-and-modal">add a comment... and another modal in a ...</div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
