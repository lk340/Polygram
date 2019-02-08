@followers.each do |follower|
  json.set! follower.id do
    json.extract! follower, :id, :user_id, :follower_id
  end
end