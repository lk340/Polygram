# json.array! @posts, :id, :caption, :image_url, :user_id

json.array! @posts do |post|
  json.extract! post, :id, :caption, :image_url, :user_id
  json.imageURL url_for(post.image)
end
