const initialState = {
  center: {lat: 36.8097343, lng: -91.5556199},
  zoom: 5,
  showingInfoWindow: false,
  markersLoading: false,
};

export default function manageMap (state = initialState, action) {
  switch (action.type) {
    case 'SET_MAP_ZOOM':
      return {...state, zoom: action.payload}
    case 'SET_MAP_CENTER':
      return {...state, center: action.payload}
    case 'TOGGLE_INFO_WINDOW':
      return {...state, showingInfoWindow: action.payload}
    case 'SET_MARKERS_LOADING_VALUE':
      return {...state, markersLoading: action.payload}
    default:
      return state
  }
}
