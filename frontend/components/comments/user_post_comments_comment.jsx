import React from 'react';

import { Link } from 'react-router-dom';

export default class UserPostCommentsComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postDeleteSpan: "post-delete-span-hide",
      loading: false,
    };
    
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.handleCommentMouseOver = this.handleCommentMouseOver.bind(this);
    this.handleCommentMouseLeave = this.handleCommentMouseLeave.bind(this);
  }

  handleCommentDelete(commentId) {
    event.preventDefault();
    return () => {
      if (!this.state.loading) {
        // this.props.removeComment(commentId).then(() => this.setState({ loading: false }));
        this.props.removeComment(commentId);
        this.setState({ loading: true });
      }
      else {
        this.setState({ loading: false });
      }
    };
  }

  handleCommentMouseOver() {
    this.setState({ postDeleteSpan: "post-delete-span" });
  }

  handleCommentMouseLeave() {
    this.setState({ postDeleteSpan: "post-delete-span-hide" });
  }

  render() {
    return (
      <li>
        <b>{
          <Link to={`/users/${this.props.commentObject.user_id}`} className="profile-link" onClick={this.props.modalClose}>
            {this.props.allUsers[this.props.commentObject.user_id].username}
          </Link>
        }</b> 
        &nbsp;<span className="comment-li" onMouseEnter={this.handleCommentMouseOver} onMouseLeave={this.handleCommentMouseLeave} onClick={this.props.commentObject.user_id === this.props.currentUser.id ? this.handleCommentDelete(this.props.commentObject.id) : this.handleCommentDelete(this.props.commentObject.id)}>{this.props.commentObject.comment}</span>
        &nbsp;<span className={this.state.postDeleteSpan}>delete?</span>
      </li>
    );
  }
}