export const fetchUsers = () => {
  return $.ajax({
    method: "GET",
    url: "/api/users",
  });
};

export const fetechUser = id => {
  return $.ajax({
    method: "GET",
    url: `/api/users/${id}`
  });
};
