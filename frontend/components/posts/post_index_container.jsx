import { connect } from 'react-redux';

import PostIndex from './post_index';
import { allPosts } from '../../actions/post_actions';

const msp = (state, ownProps) => {
  // debugger;
  return {
    allPosts: Object.values(state.entities.posts),
    currentUser: state.entities.users[state.session.id],
    currentURL: ownProps.match.path,
  };
};

const mdp = dispatch => {
  return {
    posts: () => dispatch(allPosts()),
  };
};

export default connect(msp, mdp)(PostIndex);
