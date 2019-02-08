export const createFollow = follow => {
  return $.ajax({
    method: "POST",
    url: "/api/followers",
    data: { follow }
  });
};

export const deleteFollow = followId => {
  return $.ajax({
    method: "DELETE",
    url: `/api/followers/${followId}`,
  });
};
