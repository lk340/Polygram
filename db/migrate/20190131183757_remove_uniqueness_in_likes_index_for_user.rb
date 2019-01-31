class RemoveUniquenessInLikesIndexForUser < ActiveRecord::Migration[5.2]
  def change
    remove_index :likes, :user_id
  end
end
