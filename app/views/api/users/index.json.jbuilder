@users.each do |user|
  json.set! user.id do

    json.extract! user, :id, :username, :email, :name, :biography

    json.userPosts do
      user.posts.each do |post|
        json.set! post.id do
          json.photoURL url_for(post.photo)
        end
      end
    end

    
    
  end
end

# json.photoURL url_for(@post.photo)