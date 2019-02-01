class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.text :comment
      t.integer :user_id, null: false
      t.integer :post_id, null: false
      
      t.timestamp
    end

    add_index :comments, :user_id
    add_index :comments, [:post_id, :user_id], unique: true
    
  end
end
