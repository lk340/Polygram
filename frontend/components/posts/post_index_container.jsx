import { connect } from 'react-redux';

import PostIndex from './post_index';
import { allPosts } from '../../actions/post_actions';
import { fetchUsers } from '../../actions/user_actions';

const msp = (state, ownProps) => {
  // debugger;
  return {
    allPosts: Object.values(state.entities.posts).reverse(),
    allUsers: state.entities.users,
    currentUser: state.entities.users[state.session.id],
    currentURL: ownProps.match.path,
  };
};

const mdp = dispatch => {
  return {
    posts: () => dispatch(allPosts()),
    users: () => dispatch(fetchUsers()),
  };
};

export default connect(msp, mdp)(PostIndex);
