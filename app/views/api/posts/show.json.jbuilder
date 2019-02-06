# json.extract! @post, :id, :caption, :user_id, :image, :images
json.extract! @post, :id, :caption, :user_id, :created_at
json.photoURL url_for(@post.photo)
json.likers @post.likers.pluck(:id)
json.comment_objects do
  @post.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :comment
    end
  end
end

# json.likers do
#   json.array! post.likes
# end

# json.imageURLs @post.images.map { |file| url_for(file) }