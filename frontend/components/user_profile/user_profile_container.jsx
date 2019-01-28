import { connect } from 'react-redux';

import UserProfile from './user_profile';
import { allPosts } from '../../actions/post_actions';
import { signOut } from '../../actions/session_actions';

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
    signOut: () => dispatch(signOut()),
  };
};

export default connect(msp, mdp)(UserProfile);
