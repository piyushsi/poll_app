class AddVoterIdsToPoll < ActiveRecord::Migration[6.0]
  def change
    add_reference :polls, :users, null: true, foreign_key: true
  end
end
