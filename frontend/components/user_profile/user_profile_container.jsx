import { connect } from 'react-redux';

import UserProfile from './user_profile';

const msp = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
  };
};

export default connect(msp)(UserProfile);