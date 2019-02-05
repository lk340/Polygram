import React from 'react';

export default class UserPostComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { forcedRender: true };
    
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
  }
  
  componentDidMount() {
    this.props.getComments();
  }
  
  componentWillUpdate(prevProps) {
    if (prevProps.allComments.length !== this.props.allComments.length) {
      this.setState({ forcedRender: this.state.forcedRender === true ? false : true });
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
      commentLis = Object.values(this.props.comments).map((commentObject, index) => {
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
