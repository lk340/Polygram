export const recordLike = postId => {
  return $.ajax({
    method: "POST",
    url: `/api/posts/${postId}/likes`,
  });
};

export const deleteLike = (postId, likeId) => {
  return $.ajax({
    method: "DELETE",
    url: `/api/posts/${postId}/likes/${likeId}`,
  });
};
