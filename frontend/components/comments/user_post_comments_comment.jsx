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

  componentDidUpdate(prevProps) {
    if (prevProps.commentObject.id !== this.props.commentObject.id) {
      this.setState({ loading: false });
    }
  }

  handleCommentDelete(event) {
    event.preventDefault();
    // return () => {
      if (!this.state.loading) {
        // this.props.removeComment(commentId).then(() => this.setState({ loading: false }));
        this.props.removeComment(this.props.commentObject.id);
        this.setState({ loading: true });
      }
      else {
        // this.setState({ loading: false });
      }
    // };
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
        &nbsp;<span className="comment-li" onMouseEnter={this.handleCommentMouseOver} onMouseLeave={this.handleCommentMouseLeave} onClick={this.handleCommentDelete}>{this.props.commentObject.comment} {this.props.commentObject.id} {this.props.commentObject.user_id}</span>
        &nbsp;<span className={this.state.postDeleteSpan}>delete?</span>
      </li>
    );
  }
}