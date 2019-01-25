# json.partial! "/api/posts/post", post: @post

# json.extract! @post, :id, :caption, :image_url, :user_id, :image, :images

# json.imageURLs @post.images.map { |file| url_for(file) }