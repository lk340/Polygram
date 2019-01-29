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

export const editUser = data => {
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${data.id}`,
    data: { data },
  });
};

