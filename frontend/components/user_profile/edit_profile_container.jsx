import { connect } from 'react-redux';

import EditProfile from './edit_profile';
import { editUser, createUserAWS } from '../../actions/user_actions';

const msp = state => {
  return {
    currentUser: state.entities.users[state.session.id],
    sessionId: state.session.id,
  };
};

const mdp = dispatch => {
  return {
    editUser: data => dispatch(editUser(data)),
    createAWS: formData => dispatch(createUserAWS(formData)),
  };
};

export default connect(msp, mdp)(EditProfile);
