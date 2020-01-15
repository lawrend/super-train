class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :loc
      t.string :st
      t.string :st_abbrev
      t.string :other_states
      t.float :lat
      t.float :long

      t.timestamps
    end
  end
end
