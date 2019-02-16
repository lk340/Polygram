import { connect } from 'react-redux';

import PostIndex from './post_index';
import { allPosts } from '../../actions/post_actions';
import { fetchUsers } from '../../actions/user_actions';
import { fetchLikes, createLike, deleteLike } from '../../actions/like_actions';
import { fetchComments, postComment, patchComment, deleteComment } from '../../actions/comment_actions';
import { follows } from '../../actions/follower_action';

const msp = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    currentURL: ownProps.match.path,
    sessionId: state.session.id,
    allPosts: Object.values(state.entities.posts).reverse(),
    allUsers: state.entities.users,
    allPostsObject: state.entities.posts,
    allLikes: state.entities.likes,
    allComments: Object.values(state.entities.comments),
    allFollows: Object.values(state.entities.follows),
  };
};

const mdp = dispatch => {
  return {
    posts: () => dispatch(allPosts()),
    users: () => dispatch(fetchUsers()),
    likes: () => dispatch(fetchLikes()),
    likePost: like => dispatch(createLike(like)),
    unlikePost: likeId => dispatch(deleteLike(likeId)),
    getComments: () => dispatch(fetchComments()),
    makeComment: comment => dispatch(postComment(comment)),
    editComment: comment => dispatch(patchComment(comment)),
    removeComment: commentId => dispatch(deleteComment(commentId)),
    getFollows: () => dispatch(follows()),
  };
};

export default connect(msp, mdp)(PostIndex);
