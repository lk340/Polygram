import { connect } from 'react-redux';

import UserPosts from './user_posts';
import { allPosts, deletePost, editPost } from '../../actions/post_actions';
import { fetchLikes, createLike, deleteLike } from '../../actions/like_actions';

const msp = state => {
  return {
    // posts: Object.values(state.entities.posts),
    currentUser: state.entities.users[state.session.id],
    sessionId: state.session.id,
    userPosts: Object.values(state.entities.posts).reverse(),
  };
};

const mdp = dispatch => {
  return {
    posts: () => dispatch(allPosts()),
    deletePost: id => dispatch(deletePost(id)),
    editPost: post => dispatch(editPost(post)),
  };
};

export default connect(msp, mdp)(UserPosts);
