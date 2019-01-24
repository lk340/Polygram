import { connect } from 'react-redux';

import Navbar from './navbar';
import { showPost } from '../../utils/post_api_util';

const msp = state => {
  return {
    sessionId: state.session.id,
  };
};

const mdp = dispatch => {
  return {
    showPost: id => dispatch(showPost(id)),
  };
};

export default connect(msp, mdp)(Navbar);
