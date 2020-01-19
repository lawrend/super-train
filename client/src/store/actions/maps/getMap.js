import axios from 'axios';
import { setSelectedSt, setSelectedStLocations } from '../locations/setSelectedLocation.js'

export const SET_MAP_CENTER = "SET_MAP_CENTER";
export const setMapCenter = center => ({
  type: SET_MAP_CENTER,
  payload: center,
})
export const SET_MAP_ZOOM = "SET_MAP_ZOOM";
export const setMapZoom = zoom => ({
  type: SET_MAP_ZOOM,
  payload: zoom,
})

//set map for selected state
export const setSelectedStMap = selectedSt => dispatch => {
  dispatch(setSelectedSt(selectedSt))

  axios.get('/api/states/locations/' + selectedSt)
    .then(resp => {
      const locations = resp.data;
      dispatch(setSelectedStLocations(locations))
    })
    .catch(error => console.log(error));
  axios.get('/api/states/sel_st_map/' + selectedSt)
    .then(resp => {
      const center = resp.data;
      dispatch(setMapCenter(center))

      dispatch(setMapZoom(7))
    })
    .catch(error => console.log(error));
}


