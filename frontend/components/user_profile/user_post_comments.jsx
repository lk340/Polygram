import React from 'react';
import { Link } from 'react-router-dom';

import { showPost } from '../../utils/post_api_util';
import UserPostCommentsCommentContainer from '../comments/user_post_comments_comment_container';

export default class UserPostComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      // comments: this.props.comments,
      comments: [],
      // postComments: null,
      postDeleteSpan: "post-delete-span-hide",
    };
    
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.handleCommentMouseOver = this.handleCommentMouseOver.bind(this);
    this.handleCommentMouseLeave = this.handleCommentMouseLeave.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
    if (this.props.allPosts[this.props.postId].comment_objects) {
      this.setState({ comments: Object.values(this.props.allPosts[this.props.postId].comment_objects) });
    }
  }
  
  componentWillUpdate(prevProps) {
    if (Object.values(prevProps.allComments).length !== Object.values(this.props.allComments).length) {
      this.props.getComments();
    }
  }

  handleCommentDelete(commentId) {
    return () => {
      this.props.removeComment(commentId);
    };
  }

  handleCommentMouseOver() {
    this.setState({ postDeleteSpan: "post-delete-span" });
  }

  handleCommentMouseLeave() {
    this.setState({ postDeleteSpan: "post-delete-span-hide" });
  }

  render() {
    let commentLis;
    if (this.state.comments) {
      commentLis = Object.values(this.props.allComments).map((commentObject, index) => {
        if (commentObject.post_id === this.props.postId) {
          // return <li key={`comment-${index}`}><b>{this.props.username}</b> <span className="comment-li" onClick={commentObject.user_id === this.props.currentUser.id ? this.handleCommentDelete(commentObject.id) : }>{commentObject.comment}</span></li>
          // return <li key={`comment-${index}`}>
          //   <b>{
          //     <Link to={`/users/${commentObject.user_id}`} className="profile-link" onClick={this.props.modalClose}>
          //       {this.props.allUsers[commentObject.user_id].username}
          //     </Link>
          //   }</b> 
          //   &nbsp;<span className="comment-li" onMouseEnter={this.handleCommentMouseOver} onMouseLeave={this.handleCommentMouseLeave} onClick={commentObject.user_id === this.props.currentUser.id ? this.handleCommentDelete(commentObject.id) : this.handleCommentDelete(commentObject.id)}>{commentObject.comment}</span>
          //   &nbsp;<span className={this.state.postDeleteSpan}>delete?</span></li>

          return <UserPostCommentsCommentContainer key={`comment-${index}`} modalClose={this.props.modalClose} currentUser={this.props.currentUser} allUsers={this.props.allUsers} commentObject={commentObject} />
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
