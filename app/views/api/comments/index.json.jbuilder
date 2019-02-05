@comments.each do |comment|
  json.set! comment.id do
    json.extract! comment, :id, :comment, :post_id, :user_id
  end
end