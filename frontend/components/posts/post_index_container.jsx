import { connect } from 'react-redux';

import PostIndex from './post_index';
import { allPosts } from '../../actions/post_actions';
import { fetchUsers } from '../../actions/user_actions';
import { recordLike, deleteLike } from '../../actions/like_actions';

const msp = (state, ownProps) => {
  return {
    allPosts: Object.values(state.entities.posts).reverse(),
    allUsers: state.entities.users,
    currentUser: state.entities.users[state.session.id],
    currentURL: ownProps.match.path,
    allLikes: Object.values(state.entities.likes),
  };
};

const mdp = dispatch => {
  return {
    posts: () => dispatch(allPosts()),
    users: () => dispatch(fetchUsers()),
    getPostLikes: postId => dispatch(recordLike(postId)),
    removeLike: (postId, likeId) => dispatch(deleteLike(postId, likeId)),
  };
};

export default connect(msp, mdp)(PostIndex);
