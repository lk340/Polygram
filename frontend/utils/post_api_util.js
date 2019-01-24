export const allPosts = () => {
  return $.ajax({
    method: "GET",
    url: "/api/posts",
  });
};

export const showPost = id => {
  return $.ajax({
    method: "GET",
    url: `/api/posts/${id}`,
  });
};

export const createPost = post => {
  return $.ajax({
    method: "POST",
    url: "/api/posts",
    data: { post },
    contentType: false,
    processData: false,
  });
};

export const editPost = post => {
  return $.ajax({
    method: "PATCH",
    url: `/api/posts/${post.id}`,
    data: { post },
  });
};

export const deletePost = id => {
  return $.ajax({
    method: "DELETE",
    url: `/api/posts/${id}`,
  });
};
