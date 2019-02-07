import { connect } from 'react-redux';

import SessionForm from './session_form';
import { signIn, clearErrors } from '../actions/session_actions';

const msp = (state, ownProps) => {
  return {
    formType: "signin",
    errors: state.errors,
    slash: ownProps.match.path,
  };
};

const mdp = dispatch => {
  return {
    processForm: user => dispatch(signIn(user)),
    clear: () => dispatch(clearErrors()),
  };
};

export default connect(msp, mdp)(SessionForm);
