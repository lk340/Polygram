import { connect } from 'react-redux';

import UserPosts from './user_posts';
import { allPosts, showPost } from '../../actions/post_actions';

const msp = state => {
  // debugger;
  return {
    // posts: Object.values(state.entities.posts),
    // userPosts: 
    sessionId: state.session.id,
    userPosts: Object.values(state.entities.posts).reverse(),
  };
};

const mdp = dispatch => {
  // debugger;
  return {
    posts: () => dispatch(allPosts()),
  };
};

export default connect(msp, mdp)(UserPosts);
