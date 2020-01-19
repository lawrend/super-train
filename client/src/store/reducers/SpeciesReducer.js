const initialState = {
  selected_location_species: [],
  species_locations: [],
  locations: [],
  loading: true,
};

export default function manageSpecies (state = initialState, action) {
  switch (action.type) {
    case 'SET_SELECTED_LOCATION_SPECIES':
      return {...state, selected_location_species: action.payload, loading: false}
    case 'SET_ALL_LOCATIONS_FOR_SPECIES':
      return {...state, species_locations: action.payload}
    default:
      return state
  }
}
