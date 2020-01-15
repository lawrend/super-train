class State < ApplicationRecord

  has_many :locations
  has_many :species_locations, through: :locations
  has_many :species, through: :species_locations

end
