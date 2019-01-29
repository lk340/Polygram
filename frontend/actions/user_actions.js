import * as UserAJAX from '../utils/user_api_util';

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const CHANGE_USER_INFO = "CHANGE_USER_INFO";

const receiveAllUsers = users => {
  return {
    type: RECEIVE_ALL_USERS,
    users,
  };
};

const receiveUser = user => {
  return {
    type: RECEIVE_USER,
    user,
  };
};

const changeUserInfo = data => {
  return {
    type: CHANGE_USER_INFO,
    data,
  };
};

export const fetchUsers = () => dispatch => {
  return UserAJAX.fetchUsers().then(users => dispatch(receiveAllUsers(users)));
};

export const fetchUser = id => dispatch => {
  return UserAJAX.fetchUser(id).then(user => dispatch(receiveUser(user)));
};

export const editUser = data => dispatch => {
  return UserAJAX.editUser(data).then(data => dispatch(changeUserInfo(data)));
};
