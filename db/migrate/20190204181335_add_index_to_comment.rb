class AddIndexToComment < ActiveRecord::Migration[5.2]
  def change
    add_index :comments, [:post_id, :user_id]
  end
end
