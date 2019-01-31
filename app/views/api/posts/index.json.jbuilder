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
    
    # if post.likers != nil 
    #   json.likers post.likers.pluck(:id)
    # else
    #   json.likers []
    # end
  end

  # json.likers do
  #   post.likes.each do |post|
  #     json.set! post.id, post
  #   end
  # end
end
