import React from 'react';
import { Link } from 'react-router-dom';

import { showPost } from '../../utils/post_api_util';

export default class UserPostComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      // comments: this.props.comments,
      comments: [],
      // postComments: null,
    };
    
    this.handleCommentDelete = this.handleCommentDelete.bind(this);
  }

  componentDidMount() {
    // debugger;
    this.props.getUsers();
    if (this.props.allPosts[this.props.postId].comment_objects) {
      this.setState({ comments: Object.values(this.props.allPosts[this.props.postId].comment_objects) });
    }
  }
  
  // componentDidMount() {
  //   // this.props.getComments();
  //   // console.log(this.props.allComments);
  //   showPost(this.props.postId).then(response => this.setState({ postComments: response.responseJSON }));
  //   debugger;
  // }
  
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

  render() {
    let commentLis;
    if (this.state.comments) {
      commentLis = Object.values(this.props.allComments).map((commentObject, index) => {
        if (commentObject.post_id === this.props.postId) {
          // return <li key={`comment-${index}`}><b>{this.props.username}</b> <span className="comment-li" onClick={commentObject.user_id === this.props.currentUser.id ? this.handleCommentDelete(commentObject.id) : console.log("")}>{commentObject.comment}</span></li>
          return <li key={`comment-${index}`}><b>{<Link to={`/users/${commentObject.user_id}`} className="profile-link" onClick={this.props.modalClose}>{this.props.allUsers[commentObject.user_id].username}</Link>}</b> <span className="comment-li" onClick={commentObject.user_id === this.props.currentUser.id ? this.handleCommentDelete(commentObject.id) : console.log("")}>{commentObject.comment}</span></li>
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
