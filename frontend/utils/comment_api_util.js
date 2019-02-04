export const fetchComments = () => {
  return $.ajax({
    method: "GET",
    url: "/api/comments"
  });
};

export const postComment = comment => {
  return $.ajax({
    method: "POST",
    url: "/api/comments",
    data: { comment },
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
