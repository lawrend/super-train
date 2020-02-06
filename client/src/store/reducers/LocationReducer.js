const initialState = {
  selectedSt: "None",
  selectedProtectedArea: {},
  selectedStLocations: [],
  locations: [],
  stnames: [],
  favorites: [],
  loading: true,
};

export default function manageLocation (state = initialState, action) {
  switch (action.type) {
    case 'SET_STNAMES':
      return {...state, stnames: action.payload}
    case 'SET_SELECTED_ST':
      return {...state, selectedSt: action.payload}
    case 'RESET_SELECTED_ST':
      return {...state, selectedSt: "None"}
    case 'SET_SELECTED_ST_LOCATIONS':
      return {...state, selectedStLocations: action.payload}
    case 'SET_LOCATIONS':
      return {...state, locations: action.payload, loading: false}
    case 'SET_SELECTED_PROTECTED_AREA':
      return {...state, selectedProtectedArea: action.payload}
    case 'SET_FAVORITE_STATES':
      return {...state, favorites: action.payload}
    default:
      return state
  }
}
