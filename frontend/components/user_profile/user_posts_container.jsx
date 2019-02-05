import { connect } from 'react-redux';

import UserPosts from './user_posts';
import { allPosts, deletePost, editPost } from '../../actions/post_actions';
import { fetchLikes, createLike, deleteLike } from '../../actions/like_actions';
import { fetchComments, postComment, patchComment, deleteComment } from '../../actions/comment_actions';

const msp = state => {
  return {
    // posts: Object.values(state.entities.posts),
    currentUser: state.entities.users[state.session.id],
    sessionId: state.session.id,
    userPosts: Object.values(state.entities.posts).reverse(),
    allUsers: state.entities.users,
    allLikes: state.entities.likes,
    allComments: Object.values(state.entities.comments),
  };
};

const mdp = dispatch => {
  return {
    posts: () => dispatch(allPosts()),
    deletePost: id => dispatch(deletePost(id)),
    editPost: post => dispatch(editPost(post)),
    likes: () => dispatch(fetchLikes()),
    likePost: like => dispatch(createLike(like)),
    unlikePost: likeId => dispatch(deleteLike(likeId)),
    getComments: () => dispatch(fetchComments()),
    makeComment: comment => dispatch(postComment(comment)),
    editComment: comment => dispatch(patchComment(comment)),
    removeComment: commentId => dispatch(deleteComment(commentId)),
  };
};

export default connect(msp, mdp)(UserPosts);
