// AJAX requests to sign up, sign in, and sign out users.

export const signUpAjax = user => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: { user },
  });
};

export const signInAjax = user => {
  return $.ajax({
    method: "POST",
    url: "/api/session",
    data: { user },
  });
};

export const signOutAjax = () => {
  return $.ajax({
    method: "DELETE",
    url: "/api/session",
  });
};
