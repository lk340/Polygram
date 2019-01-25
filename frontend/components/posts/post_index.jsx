import React from 'react';

export default class PostIndex extends React.Component {
  componentDidMount() {
    this.props.posts();
  }
  
  render() {
    let posts;
    if (this.props.currentUser) {
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
                <div><i class="far fa-heart"></i></div>
                <div><i class="far fa-comment"></i></div>
                <div></div>
              </div>

              <div><i class="fas fa-ribbon"></i></div>
            </div>

            <div className="post-likes">insert # likes here</div>
            
            <div className="post-caption" key={`post-${index}`}>
              <span className="post-username-span"> { this.props.currentUser.username } </span> { post.caption }
            </div>
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
