export const postComment = data => {
  return $.ajax({
    method: "POST",
    url: "/api/comments",
    data: { data },
  });
};

export const patchComment = data => {
  return $.ajax({
    method: "PATCH",
    url: `/api/comments/${data.id}`,
    data: { data },
  });
};

export const deleteComment = id => {
  return $.ajax({
    method: "DELETE",
    url: `/api/comments/${id}`,
  });
};
