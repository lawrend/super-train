class Species < ApplicationRecord
  include Wikipedia

  has_many :species_locations
  has_many :locations, through: :species_locations

end
