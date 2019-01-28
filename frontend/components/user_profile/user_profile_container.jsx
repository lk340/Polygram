import { connect } from 'react-redux';

import UserProfile from './user_profile';
import { allPosts } from '../../actions/post_actions';

const msp = state => {
  return {
    currentUser: state.entities.users[state.session.id],
    sessionId: state.session.id,
    posts: state.entities.posts,
  };
};

const mdp = dispatch => {
  return {
    allPosts: () => dispatch(allPosts()),
  };
};

export default connect(msp, mdp)(UserProfile);
