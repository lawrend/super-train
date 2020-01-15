class CreateStates < ActiveRecord::Migration[5.2]
  def change
    create_table :states do |t|
      t.string :name
      t.string :abbrev
      t.float :lat
      t.float :long

      t.timestamps
    end
  end
end
