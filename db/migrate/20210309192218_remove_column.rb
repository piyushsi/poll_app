class RemoveColumn < ActiveRecord::Migration[6.0]
  def change
    remove_column :polls, :users_id
    add_column :polls, :user_id, :string
  end
end
