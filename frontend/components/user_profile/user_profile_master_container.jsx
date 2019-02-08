import { connect } from 'react-redux';

import UserProfileMaster from './user_profile_master';
import { fetchUsers } from '../../actions/user_actions';

const msp = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    userId: parseInt(ownProps.match.params.userId),
    allUsers: state.entities.users,
  };
};

const mdp = dispatch => {
  return {
    getUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(msp, mdp)(UserProfileMaster);
