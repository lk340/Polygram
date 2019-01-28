@users.each do |user|
  json.set! user.id do
    json.extract! user, :id, :username, :email, :name, :biography, :image_url
  end
end
