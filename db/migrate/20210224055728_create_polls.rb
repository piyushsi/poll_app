class CreatePolls < ActiveRecord::Migration[6.0]
  def change
    create_table :polls do |t|
      t.string :question
      t.integer :user_id

      t.timestamps
    end
  end
end