import React from 'react';

export default class PostIndex extends React.Component {
  componentDidMount() {
    this.props.posts();
  }
  
  render() {
    let posts;
    if (this.props.currentUser && this.props.currentURL === "/") {
      posts = this.props.allPosts.map((post, index) => {
        return (
          <div className="post-container">
            <div className="post-top">
              <div className="user-photo">[ userphoto ] &nbsp;</div>
              <div className="post-username">{ this.props.currentUser.username }</div>
            </div>

            <img src={post.photoURL} />

            <div className="post-actions">
              <div className="post-like-comment">
                <div><i className="far fa-heart"></i></div>
                <div><i className="fas fa-heart heart2"></i></div>
                <div><i className="far fa-comment"></i></div>
                <div></div>
              </div>

              <div><i class="far fa-bookmark"></i></div>
            </div>

            <div className="post-likes">insert # likes here</div>
            
            <p className="post-caption" key={`post-${index}`}>
              <span className="post-username-span"> { this.props.currentUser.username } </span> { post.caption }
            </p>
          </div>
          )
      });
    }

    return (
      <div className="post-index">
        { posts }
      </div>
    );
  }
}
