import { connect } from 'react-redux';
import { deleteComment } from '../../actions/comment_actions';

import Comments from './comments';

const msp = state => {
  return {
    currentUser: state.entities.users[state.session.id],
    sessionId: state.session.id,
  };
};

const mdp = dispatch => {
  return {
    removeComment: commentId => dispatch(deleteComment(commentId)),
  };
};

export default connect(msp, mdp)(Comments);
