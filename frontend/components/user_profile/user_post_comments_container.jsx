import { connect } from 'react-redux';

import UserPostComments from './user_post_comments';
import { fetchUsers } from '../../actions/user_actions';
import { fetchComments, postComment, patchComment, deleteComment } from '../../actions/comment_actions';
import { showPost } from '../../actions/post_actions';

const msp = state => {
  return {
    currentUser: state.entities.users[state.session.id],
    allComments: Object.values(state.entities.comments),
    allPosts: state.entities.posts,
    allUsers: state.entities.users,
  };
};

const mdp = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers()),
    getComments: () => dispatch(fetchComments()),
    makeComment: comment => dispatch(postComment(comment)),
    editComment: comment => dispatch(patchComment(comment)),
    removeComment: commentId => dispatch(deleteComment(commentId)),
    getPost: postId => dispatch(showPost(postId)),
  };
};

export default connect(msp, mdp)(UserPostComments);
