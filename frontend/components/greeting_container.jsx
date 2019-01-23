import { connect } from 'react-redux'

import Greeting from './greeting';
import { signOut } from '../actions/session_actions';

const msp = state => {
  return {
    currentUserId: state.session.id,
    currentUser: state.entities.users[state.session.id],
  };
};

const mdp = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(msp, mdp)(Greeting);
