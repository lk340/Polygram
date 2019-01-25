import { connect } from 'react-redux';

import PostIndex from './post_index';
import { allPosts } from '../../actions/post_actions';

const msp = state => {
  // debugger;
  return {
    allPosts: Object.values(state.entities.posts),
    currentUser: state.entities.users[state.session.id],
  };
};

const mdp = dispatch => {
  return {
    posts: () => dispatch(allPosts()),
  };
};

export default connect(msp, mdp)(PostIndex);
