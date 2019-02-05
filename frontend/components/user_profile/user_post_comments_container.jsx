import { connect } from 'react-redux';

import UserPostComments from './user_post_comments';
import { fetchComments, postComment, patchComment, deleteComment } from '../../actions/comment_actions';

const msp = state => {
  return {
    allComments: Object.values(state.entities.comments),
  };
};

const mdp = dispatch => {
  return {
    getComments: () => dispatch(fetchComments()),
    makeComment: comment => dispatch(postComment(comment)),
    editComment: comment => dispatch(patchComment(comment)),
    removeComment: commentId => dispatch(deleteComment(commentId)),
  };
};

export default connect(msp, mdp)(UserPostComments);
