# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_01_15_012704) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "locations", force: :cascade do |t|
    t.string "loc"
    t.string "st"
    t.string "st_abbrev"
    t.string "other_states"
    t.float "lat"
    t.float "long"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "species", force: :cascade do |t|
    t.string "name"
    t.string "location"
    t.string "status"
    t.string "desc"
    t.string "imgsrc"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "species_locations", force: :cascade do |t|
    t.bigint "species_id"
    t.bigint "location_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_species_locations_on_location_id"
    t.index ["species_id"], name: "index_species_locations_on_species_id"
  end

  create_table "states", force: :cascade do |t|
    t.string "name"
    t.string "abbrev"
    t.float "lat"
    t.float "long"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "species_locations", "locations"
  add_foreign_key "species_locations", "species"
end
