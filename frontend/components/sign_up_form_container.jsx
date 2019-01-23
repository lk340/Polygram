import { connect } from 'react-redux';

import SessionForm from './session_form';
import { signUp } from '../actions/session_actions';

const msp = state => {
  return {
    formType: "signup",
    errors: state.errors,
  };
};

const mdp = dispatch => {
  return {
    processForm: user => dispatch(signUp(user)),
  };
};

export default connect(msp, mdp)(SessionForm);