class Location < ApplicationRecord
  include Enigma, Wikipedia

  belongs_to :state
  has_many :species_locations
  has_many :species, through: :species_locations

end
