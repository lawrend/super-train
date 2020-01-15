class CreateSpeciesLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :species_locations do |t|
      t.references :species, foreign_key: true
      t.references :location, foreign_key: true

      t.timestamps
    end
  end
end
