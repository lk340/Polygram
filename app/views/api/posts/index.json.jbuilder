# json.array! @posts, :id, :caption, :image_url, :user_id

# @posts.each do |post|
#   json.extract! post, :id, :caption, :user_id
#   json.photoURL url_for(post.photo)
# end

@posts.each do |post|
  json.set! post.id do
    json.extract! post, :id, :caption, :user_id, :created_at
    json.photoURL url_for(post.photo)
    json.likers post.likers.pluck(:id)
    # json.comments post.comments.pluck(:comment)
    json.comment_objects do
      post.comments.each do |comment|
        json.set! comment.id do
          json.extract! comment, :id, :comment
        end
      end
    end
  end
end
