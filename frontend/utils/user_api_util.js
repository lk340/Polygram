export const fetchUsers = () => {
  return $.ajax({
    method: "GET",
    url: "/api/users",
  });
};

export const fetchUser = id => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${id}`
  });
};

export const editUser = user => {
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${user.id}`,
    data: { user },
  });
};

export const createUserAWS = formData => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    processData: false,
    contentType: false,
    dataType: "json",
    data: formData,
  });
};
