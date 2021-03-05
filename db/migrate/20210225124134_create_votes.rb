class CreateVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :votes do |t|
      t.references :poll, null: false, foreign_key: true
      t.references :users, null: false, foreign_key: true
      t.references :options, null: false, foreign_key: true

      t.timestamps
    end
  end
end
