import { connect } from 'react-redux';

import EditProfile from './edit_profile';
import { editUser } from '../../actions/user_actions';

const msp = state => {
  return {
    currentUser: state.entities.users[state.session.id],
    sessionId: state.session.id,
  };
};

const mdp = dispatch => {
  return {
    editUser: data => dispatch(editUser(data)),
  };
};

export default connect(msp, mdp)(EditProfile);
