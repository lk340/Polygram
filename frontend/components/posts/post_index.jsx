import React from 'react';

export default class PostIndex extends React.Component {
  componentDidMount() {
    this.props.posts();
  }
  
  render() {
    let posts;
    posts = this.props.allPosts.map((post, index) => {
      return (
        <div key={ `post-${index}` }>
          { post.caption }
          <img src={ post.photoURL } alt=""/>
        </div>)
    });

    return (
      <div>
        { posts }
      </div>
    );
  }
}
