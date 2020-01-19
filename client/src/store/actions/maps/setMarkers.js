import axios from 'axios';
import { setSelectedStLocations } from '../locations/setSelectedLocation.js';

// updates all of a State's locations with lat and long to be used as markers
// export const SET_ST_LOCATIONS_MARKERS = 'SET_ST_LOCATIONS_MARKERS';
// const setSelectedStLocationsMarkers = markerInfo => ({
  // type: SET_ST_LOCATIONS_MARKERS,
  // payload: markerInfo
// })

export const getSelectedStLocationsMarkers = st => dispatch => {
  axios.get('/api/states/locations/markers/' + st)
    .then(resp => {
      const new_locations = resp.data;
      dispatch(setSelectedStLocations(new_locations))
    })
    .catch(error => console.log(error));
}




