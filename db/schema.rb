# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_09_194942) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "options", force: :cascade do |t|
    t.string "name"
    t.integer "vote_count"
    t.bigint "poll_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["poll_id"], name: "index_options_on_poll_id"
  end

  create_table "polls", force: :cascade do |t|
    t.string "question"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "votes", force: :cascade do |t|
    t.bigint "poll_id", null: false
    t.bigint "users_id", null: false
    t.bigint "options_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["options_id"], name: "index_votes_on_options_id"
    t.index ["poll_id"], name: "index_votes_on_poll_id"
    t.index ["users_id"], name: "index_votes_on_users_id"
  end

  add_foreign_key "options", "polls"
  add_foreign_key "votes", "options", column: "options_id"
  add_foreign_key "votes", "polls"
  add_foreign_key "votes", "users", column: "users_id"
end
