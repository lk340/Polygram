import { connect } from 'react-redux';

import App from './app';

const msp = state => {
  return {
    currentUser: state.entities.users[state.session.id],

  };
};

export default connect(msp)(App);