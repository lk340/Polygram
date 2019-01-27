import React from 'react';

export default class UserPosts extends React.Component {
  componentDidMount() {
    this.props.posts();
  }
  
  render() {
    // NOTE TO SELF: Find a more efficient way to go about this
      // Below method is very bad because O(n) will increase dramatically
      // as the number of posts by users increases.
      // It's okay in the scope of this project, but not in the scope of a
      // real application.

    const posts = this.props.userPosts.map((post, index) => {
      if (post.user_id === this.props.sessionId) {
        return (
          // <div key={index}>
            <img className="user-post-photo" src={ post.photoURL } alt="photo" key={ index } />
          // </div>
        )
      }
    });
    
    return (
      <div className="user-posts">
        { posts }
      </div>
    )
  }
}
