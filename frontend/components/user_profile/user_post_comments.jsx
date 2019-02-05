import React from 'react';

export default class UserPostComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: this.props.comments };
    
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
  }
  
  componentDidMount() {
    this.props.getComments();
  }
  
  componentWillUpdate(prevProps) {
    if (prevProps.allComments.length !== this.props.allComments.length) {
      this.props.getComments();
    }
  }

  handleCommentDelete(commentId) {
    return () => {
      this.props.removeComment(commentId);
    };
  }

  render() {
    let commentLis;
    if (this.props.comments) {
      commentLis = this.props.allComments.map((commentObject, index) => {
        return <li key={`comment-${index}`}><b>{this.props.username}</b> <span className="comment-li" onClick={this.handleCommentDelete(commentObject.id)}>{commentObject.comment}</span></li>
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
