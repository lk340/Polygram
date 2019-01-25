import React from 'react';

export default class PostIndex extends React.Component {
  componentDidMount() {
    posts = this.props.posts().map((post, index) => {
      return <div key={ index }>{ post }</div>
    });
  }
  
  render() {
    let posts;

    return (
      <div>
        { posts }
      </div>
    );
  }
}
