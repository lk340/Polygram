import React from 'react';
import Modal from 'react-modal';

export default class UserPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false, photoURL: null };

    this.handleClick = this.handleClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }
  
  componentDidMount() {
    this.props.posts();
  }
  
  handleClick(post) {
    // debugger;
    return () => {
      this.setState({ modalOpen: true, photoURL: post.photoURL });
    };
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
                  <div><span>{this.props.currentUser.username} </span> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod cum saepe quidem consectetur reiciendis commodi amet, quam totam, iure eum rem corporis nesciunt eveniet consequuntur impedit modi sequi aspernatur sunt. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos ea tempore culpa soluta voluptatem qui neque nam facilis. Fugit ad nisi eum eligendi enim neque illo alias necessitatibus modi quam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium dolorem quis quod, assumenda laboriosam impedit, fuga dicta deleniti ea tempora maxime. Minus ab omnis labore sapiente odio eius, reprehenderit tempore? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex laboriosam magni obcaecati eius temporibus consequatur iusto pariatur perferendis voluptatibus omnis dolorem voluptates libero labore, suscipit vel vitae nihil aliquid corporis! Veniam quis facilis recusandae maiores quod, modi in fuga, molestiae rem omnis nostrum repellendus obcaecati aliquam ratione odit totam deleniti, doloremque pariatur laudantium. Maiores, placeat! Architecto, ratione reprehenderit dolores illo corrupti aspernatur molestias. Ut nemo, obcaecati quaerat dolor molestias ad, illum commodi fugit numquam culpa eligendi ducimus nihil saepe consequuntur? Vitae soluta accusamus nihil beatae consectetur minima rem, modi architecto culpa explicabo aliquam neque quas error iusto fugiat itaque deleniti!</div>
                  <div className="photo-modal-caption-comments">Comments go here</div>
                </div>
              </div>

              <div className="photo-modal-data-bottom">
                <div className="photo-modal-like-comment">like comment share favorite</div>
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
