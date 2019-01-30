import { connect } from 'react-redux';

import Navbar from './navbar';
import { showPost, createPostAWS } from '../../actions/post_actions';

const msp = state => {
  return {
    sessionId: state.session.id,
    currentUser: state.entities.users[state.session.id],
  };
};

const mdp = dispatch => {
  return {
    showPost: id => dispatch(showPost(id)),
    createAWS: formData => dispatch(createPostAWS(formData)),
  };
};

export default connect(msp, mdp)(Navbar);
