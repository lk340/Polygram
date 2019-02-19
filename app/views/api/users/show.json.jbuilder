# json.partial! "api/users/user", user: @user
json.extract! @user, :id, :username, :email, :name, :biography
# json.extract! @user, :id, :username, :email, :name, :biography, :profile_picture

# json.photoURL url_for(@user.profile_picture)
