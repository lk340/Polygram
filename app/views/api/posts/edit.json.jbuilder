json.extract! @post, :id, :caption, :user_id, :created_at
json.photoURL url_for(@post.photo)
json.likers @post.likers.pluck(:id) 