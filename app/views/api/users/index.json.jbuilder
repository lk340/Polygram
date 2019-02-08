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

    json.user_followers user.followers.pluck(:follower_id)
    # json.following user.following.pluck(:id)

    # json.user_followers do
    #   user.followers.each do |follower|
    #     # follower.pluck(:id)
    #     # json.array! follower, :id
    #     json.follower_id follower.id
        
    #   end
    # end
    
  end
end

# json.photoURL url_for(@post.photo)