class RemoveImageUrlFromUsersTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :image_url
  end
end
