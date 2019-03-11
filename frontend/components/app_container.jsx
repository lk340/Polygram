import { connect } from 'react-redux';

import App from './app';
import { fetchUsers } from '../utils/user_api_util';

const msp = (state, ownProps) => {
  // debugger;
  return {
    currentUser: state.entities.users[state.session.id],
    sessionId: state.session.id,
    path: ownProps.match.path,
    allUsers: state.entities.users,
    url: ownProps.match.path,
  };
};

const mdp = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(msp, mdp)(App);
