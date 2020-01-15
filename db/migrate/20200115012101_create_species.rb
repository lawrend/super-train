class CreateSpecies < ActiveRecord::Migration[5.2]
  def change
    create_table :species do |t|
      t.string :name
      t.string :location
      t.string :status
      t.string :desc
      t.string :imgsrc

      t.timestamps
    end
  end
end
