import * as UserAJAX from '../utils/user_api_util';

export const RECEIVE_ALL_USERS = "RECEIVE_ALL_USERS";

const receiveAllUsers = users => {
  return {
    type: RECEIVE_ALL_USERS,
    users,
  };
};

export const fetchUsers = () => dispatch => {
  return UserAJAX.fetchUsers().then(users => dispatch(receiveAllUsers(users)));
};