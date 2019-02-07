import { connect } from 'react-redux';

import UserProfileMaster from './user_profile_master';

const msp = (state, ownProps) => {
  // debugger;
  return {
    currentUser: state.entities.users[state.session.id],
    userId: parseInt(ownProps.match.params.userId),
  };
};

export default connect(msp)(UserProfileMaster);
