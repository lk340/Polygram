import { connect } from 'react-redux';

import PostIndex from './post_index';
import { allPosts } from '../../actions/post_actions';
import { fetchUsers } from '../../actions/user_actions';
import { fetchLikes, createLike, deleteLike } from '../../actions/like_actions';

const msp = (state, ownProps) => {
  // debugger;
  return {
    currentUser: state.entities.users[state.session.id],
    currentURL: ownProps.match.path,
    sessionId: state.session.id,
    allPosts: Object.values(state.entities.posts).reverse(),
    allUsers: state.entities.users,
    allLikes: Object.values(state.entities.likes),
    // allLikes: state.entities.likes,
    likes: state.entities.likes,
  };
};

const mdp = dispatch => {
  return {
    posts: () => dispatch(allPosts()),
    users: () => dispatch(fetchUsers()),
    likes: () => dispatch(fetchLikes()),
    likePost: like => dispatch(createLike(like)),
    unlikePost: likeId => dispatch(deleteLike(likeId)),
  };
};

export default connect(msp, mdp)(PostIndex);
