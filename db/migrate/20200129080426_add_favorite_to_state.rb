class AddFavoriteToState < ActiveRecord::Migration[5.2]
  def change
    add_column :states, :favorite, :boolean
  end
end
