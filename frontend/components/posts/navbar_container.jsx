import { connect } from 'react-redux';

import Navbar from './navbar';
import { fetchUsers } from '../../actions/user_actions';
import { showPost, createPostAWS } from '../../actions/post_actions';

const msp = (state, ownProps) => {
  debugger;
  return {
    sessionId: state.session.id,
    currentUser: state.entities.users[state.session.id],
    allUsers: state.entities.users,
  };
};

const mdp = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers()),
    showPost: id => dispatch(showPost(id)),
    createAWS: formData => dispatch(createPostAWS(formData)),
  };
};

export default connect(msp, mdp)(Navbar);
