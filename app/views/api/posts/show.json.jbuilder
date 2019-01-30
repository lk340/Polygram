# json.partial! "/api/posts/post", post: @post

# json.extract! @post, :id, :caption, :user_id, :image, :images
json.extract! @post, :id, :caption, :user_id
json.photoURL url_for(@post.photo)

# json.imageURLs @post.images.map { |file| url_for(file) }