import * as PostAJAX from '../utils/post_api_util';

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_POST = "RECEIVE_POST";
export const CREATE_POST = "CREATE_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const POST_ERRORS = "POST_ERRORS";

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

const postErrorsAction = errors => {
  return {
    type: POST_ERRORS,
    errors,
  };
};

export const allPosts = () => dispatch => {
  return PostAJAX.allPosts().then(posts => dispatch(receivePostsAction(posts)));
};

export const showPost = id => dispatch => {
  return PostAJAX.showPost(id)
    .then(
      post => dispatch(receivePostAction(post)),
      errors => dispatch(postErrorsAction(errors.responseJSON))
    );
};

export const createPost = post => dispatch => {
  return PostAJAX.createPost(post)
    .then(
      post => dispatch(createPostAction(post)),
      errors => dispatch(postErrorsAction(errors.responseJSON))
    );
};

export const editPost = post => dispatch => {
  return PostAJAX.editPost(post)
    .then(
      post => {
        debugger;
        dispatch(editPostAction(post));
      },
      errors => dispatch(postErrorsAction(errors.responseJSON))
    );
};

export const deletePost = id => dispatch => {
  return PostAJAX.deletePost(id)
    .then(
      post => {
        return dispatch(deletePostAction(post.id));
      },
      errors => {
        return dispatch(postErrorsAction(errors.responseJSON));
      }
    );
};

export const createPostAWS = formData => dispatch => {
  return PostAJAX.createPostAWS(formData)
    .then(
      formPost => dispatch(createPostAction(formPost)),
      errors => dispatch(postErrorsAction(errors.responseJSON))
    );
};
