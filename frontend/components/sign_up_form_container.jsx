import { connect } from 'react-redux';

import SessionForm from './session_form';
import { signUp } from '../actions/session_actions';

const msp = (state, ownProps) => {
  return {
    formType: "signup",
    errors: state.errors,
    slash: ownProps.match.path,
  };
};

const mdp = dispatch => {
  return {
    processForm: user => dispatch(signUp(user)),
  };
};

export default connect(msp, mdp)(SessionForm);