class AddStateToLocation < ActiveRecord::Migration[5.2]
  def change
    add_reference :locations, :state, foreign_key: true
  end
end
