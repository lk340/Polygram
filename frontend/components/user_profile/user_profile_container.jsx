import { connect } from 'react-redux';

import UserProfile from './user_profile';
import { allPosts } from '../../actions/post_actions';
import { signOut } from '../../actions/session_actions';
import { editUser } from '../../actions/user_actions';

const msp = state => {
  return {
    currentUser: state.entities.users[state.session.id],
    sessionId: state.session.id,
    posts: state.entities.posts,
    profilePicture: state.entities.users.profile,
  };
};

const mdp = dispatch => {
  return {
    allPosts: () => dispatch(allPosts()),
    signOut: () => dispatch(signOut()),
    editUser: user => dispatch(editUser(user)),
  };
};

export default connect(msp, mdp)(UserProfile);
