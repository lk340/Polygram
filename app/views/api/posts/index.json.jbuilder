# json.array! @posts, :id, :caption, :image_url, :user_id

json.array! @posts do |post|
  json.extract! post, :id, :caption, :user_id
  json.photoURL url_for(post.photo)
end
