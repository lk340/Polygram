import { connect } from 'react-redux';

import PostIndex from './post_index';
import { allPosts } from '../../actions/post_actions';

const msp = state => {
  return {

  };
};

const mdp = dispatch => {
  return {
    posts: () => dispatch(allPosts()),
  };
};

export default connect(null, mdp)(PostIndex)