class DeletePostIdUserIdIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :likes, [:post_id, :user_id]
  end
end
