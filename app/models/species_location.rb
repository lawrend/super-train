class SpeciesLocation < ApplicationRecord
  belongs_to :species
  belongs_to :location
end
