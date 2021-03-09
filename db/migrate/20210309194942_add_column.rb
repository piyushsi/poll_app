class AddColumn < ActiveRecord::Migration[6.0]
  def change
    add_column :polls, :user_id, :string
  end
end
