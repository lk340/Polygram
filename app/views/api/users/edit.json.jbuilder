json.extract! @user, :id, :username, :password, :email, :name, :biography, :profile_picture

json.photoURL url_for(@user.profile_picture)