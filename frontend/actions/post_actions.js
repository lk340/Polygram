import * as PostAJAX from '../utils/post_api_util';

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const CREATE_POST = "CREATE_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";

const receivePostsAction = posts => {
  return {
    type: RECEIVE_POSTS,
    posts,
  };
};

const receivePostAction = post => {
  return {
    type: RECEIVE_POST,
    post,
  };
};

const createPostAction = post => {
  return {
    type: CREATE_POST,
    post,
  };
};

const editPostAction = post => {
  return {
    type: CREATE_POST,
    post,
  };
};

const deletePostAction = postId => {
  return {
    type: DELETE_POST,
    postId,
  };
};

export const allPosts = () => dispatch => {
  return PostAJAX.allPosts().then(posts => dispatch(receivePostsAction(posts)));
};

export const showPost = id => dispatch => {
  return PostAJAX.showPost(id).then(post => dispatch(receivePostAction(post)));
};

export const createPost = post => dispatch => {
  return PostAJAX.createPost(post).then(post => dispatch(createPostAction(post)));
};

export const editPost = post => dispatch => {
  return PostAJAX.editPost(post).then(post => dispatch(editPostAction(post)));
};

export const deletePost = id => dispatch => {
  return PostAJAX.deletePost(id).then(post => dispatch(deletePostAction(post.id)));
};
