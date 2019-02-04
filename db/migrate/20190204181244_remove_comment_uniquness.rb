class RemoveCommentUniquness < ActiveRecord::Migration[5.2]
  def change
    remove_index :comments, [:post_id, :user_id]
  end
end
