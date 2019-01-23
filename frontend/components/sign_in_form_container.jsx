import { connect } from 'react-redux';

import SessionForm from './session_form';
import { signIn } from '../actions/session_actions';

const msp = (state, ownProps) => {
  return {
    formType: "signin",
    errors: state.errors,
  };
};

const mdp = dispatch => {
  return {
    processForm: user => dispatch(signIn(user)),
  };
};

export default connect(msp, mdp)(SessionForm);