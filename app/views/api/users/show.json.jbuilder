# json.partial! "api/users/user", user: @user
json.extract! @user, :id, :username, :email, :name, :biography
json.photoURL url_for(@post.photo)