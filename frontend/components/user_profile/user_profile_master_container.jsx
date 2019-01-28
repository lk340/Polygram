import { connect } from 'react-redux';

import UserProfileMaster from './user_profile_master';

const msp = state => {
  return {
    currentUser: state.entities.users[state.session.id],
  };
};

export default connect(msp)(UserProfileMaster);
