import * as AJAX from '../utils/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const SIGN_OUT_CURRENT_USER = "SIGN_OUT_CURRENT_USER"
export const CLEAR_ERRORS = "CLEAR_ERRORS"; 

const receiveCurrentUser = currentUser => {
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser,
  };
};

const signOutCurrentUser = () => {
  return {
    type: SIGN_OUT_CURRENT_USER,
  };
};

// Will take an array of errors (will iterate through this to display on website)
const receiveErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const signUp = user => dispatch => {
  return AJAX.signUpAjax(user)
    .then(
      currentUser => dispatch(receiveCurrentUser(currentUser)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    );
};

export const signIn = user => dispatch => {
  return AJAX.signInAjax(user)
    .then(
      currentUser => dispatch(receiveCurrentUser(currentUser)),
      errors => dispatch(receiveErrors(errors.responseJSON))
    );
};

export const signOut = () => dispatch => {
  return AJAX.signOutAjax().then(() => dispatch(signOutCurrentUser()));
};
