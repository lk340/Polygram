@followers.each do |follower|
  json.extract! follower, :id, :user_id, :follower_id
end