class RemoveColumn < ActiveRecord::Migration[6.0]
  def change
    remove_column :poll, :users_id
  end
end
