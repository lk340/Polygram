json.extract! @post, :id, :caption, :user_id
json.photoURL url_for(@post.photo)