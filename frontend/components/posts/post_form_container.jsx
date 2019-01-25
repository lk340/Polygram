import { connect } from 'react-redux';

import PostForm from './post_form';
// import { allPosts, showPost, createPost, editPost, deletePost } from '../../actions/post_actions';
import { createPostAWS } from '../../actions/post_actions';
 
const msp = state => {
  return {
    currentUser: state.entities.users[state.session.id],
    sessionId: state.session.id,
    errors: state.errors.post,
  };
};

const mdp = dispatch => {
  return {
    createAWS: formData => dispatch(createPostAWS(formData)),
    // posts: () => dispatch(allPosts()),
    // show: id => dispatch(showPost(id)),
    // create: post => dispatch(createPost(post)),
    // edit: post => dispatch(editPost(post)),
    // delete: id => dispatch(deletePost(id)),
  };
};

export default connect(msp, mdp)(PostForm);
