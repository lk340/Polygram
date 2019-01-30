import { connect } from 'react-redux';

import UserPosts from './user_posts';
import { allPosts, deletePost } from '../../actions/post_actions';

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
  };
};

export default connect(msp, mdp)(UserPosts);
