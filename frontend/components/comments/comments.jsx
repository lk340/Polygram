import React from 'react';
import { Link } from 'react-router-dom';

export default class Comments extends React.Component {
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

  handleCommentMouseOver() {
    this.setState({ postDeleteSpan: "post-delete-span" });
  }

  handleCommentMouseLeave() {
    this.setState({ postDeleteSpan: "post-delete-span-hide" });
  }

  // handleCommentDelete(commentObject) {
  //   if (commentObject.user_id === this.props.currentUser.id) {
  //     return () => {
  //       this.props.removeComment(commentObject.id);
  //     };
  //   }
  // }

  handleCommentDelete(event) {
    event.preventDefault();
    const { commentObject, currentUser } = this.props;

    if (commentObject.user_id === currentUser.id) {
      if (!this.state.loading) {
        this.setState({ loading: true });
        this.props.removeComment(this.props.commentObject.id).then(() => this.setState({ loading: false }));
      }
    }
  }
  
  render() {
    return (
      <li id={this.props.commentObject.id} className="comment">
        <b>{
          <Link className="profile-link" to={`/users/${this.props.allUsers[this.props.commentObject.user_id].id}`}>
            {this.props.allUsers[this.props.commentObject.user_id].username}
          </Link>
        }</b>
        &nbsp;<span className="comment-li" onMouseEnter={this.handleCommentMouseOver} onMouseLeave={this.handleCommentMouseLeave} onClick={this.handleCommentDelete}>{this.props.commentObject.comment}</span>
        &nbsp;<span className={this.state.postDeleteSpan}>delete?</span>
      </li>
    )
  }
};
