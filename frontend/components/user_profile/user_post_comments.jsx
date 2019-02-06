import React from 'react';

import { showPost } from '../../utils/post_api_util';

export default class UserPostComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      comments: this.props.comments, 
      // postComments: null,
    };
    
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
  }
  
  // componentDidMount() {
  //   // this.props.getComments();
  //   // console.log(this.props.allComments);
  //   showPost(this.props.postId).then(response => this.setState({ postComments: response.responseJSON }));
  //   debugger;
  // }
  
  // componentWillUpdate(prevProps) {
  //   if (Object.values(prevProps.allComments).length !== Object.values(this.props.allComments).length) {
  //     this.props.getComments();
  //   }
  // }

  handleCommentDelete(commentId) {
    return () => {
      this.props.removeComment(commentId);
    };
  }

  render() {
    let commentLis;
    if (this.props.comments) {
      commentLis = Object.values(this.props.allComments).map((commentObject, index) => {
        if (commentObject.post_id === this.props.postId) {
          return <li key={`comment-${index}`}><b>{this.props.username}</b> <span className="comment-li" onClick={this.handleCommentDelete(commentObject.id)}>{commentObject.comment}</span></li>
        }
      });
    }
    
    return (
      <div className="photo-modal-caption-comments">
        <ul>
          {commentLis}
        </ul>
      </div>
    )
  }
}
