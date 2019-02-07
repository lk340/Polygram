import { connect } from 'react-redux';

import PostIndexPost from './post_index_post';
import { allPosts } from '../../actions/post_actions';
import { fetchUsers } from '../../actions/user_actions';
import { fetchLikes, createLike, deleteLike } from '../../actions/like_actions';
import { fetchComments, postComment, patchComment, deleteComment } from '../../actions/comment_actions';

const msp = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    sessionId: state.session.id,
    // currentURL: ownProps.match.path,
    allPosts: Object.values(state.entities.posts).reverse(),
    allUsers: state.entities.users,
    allPostsObject: state.entities.posts,
    allLikes: state.entities.likes,
    allComments: Object.values(state.entities.comments),
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
  };
};

export default connect(msp, mdp)(PostIndexPost);
