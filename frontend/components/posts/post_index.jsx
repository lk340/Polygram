import React from 'react';

export default class PostIndex extends React.Component {
  constructor(props) {
    super(props);

  }
  
  componentDidMount() {
    this.props.users();
    this.props.posts();
  }
  
  render() {
    let posts;
    if (this.props.currentUser && this.props.currentURL === "/") {
      posts = this.props.allPosts.map((post, index) => {
        return (
          <div className="post-container" key={index}>
            <div className="post-top">
              <div className="user-photo">[ userphoto ] &nbsp;</div>
              <div className="post-username">{ this.props.allUsers[post.user_id].username }</div>
            </div>

            <img src={ post.photoURL } />

            <div className="post-actions">
              <div className="post-like-comment">
                <div><i className="far fa-heart"></i></div>
                <div className="heart-show"><i className="fas fa-heart red-heart"></i></div>
                <div><i className="far fa-comment"></i></div>
                <div></div>
              </div>

              <div><i className="far fa-bookmark"></i></div>
            </div>

            <div className="post-likes">insert # likes here</div>
            
            <p className="post-caption" key={`post-${ index }`}>
              <span className="post-username-span"> { this.props.allUsers[post.user_id].username } </span> { post.caption }
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
