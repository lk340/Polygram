export const getFollowers = () => {
  return $.ajax({
    method: "GET",
    url: "/api/followers",
  });
};

export const createFollow = follower => {
  return $.ajax({
    method: "POST",
    url: "/api/followers",
    data: { follower },
  });
};

export const deleteFollow = followId => {
  return $.ajax({
    method: "DELETE",
    url: `/api/followers/${followId}`,
  });
};
