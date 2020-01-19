import axios from 'axios';

export const SET_LOCATIONS = "SET_LOCATIONS";
const setLocations = locations => ({
  type: SET_LOCATIONS,
  payload: locations,
})

export const SET_STNAMES = "SET_STNAMES";
export const setStnames = stnames => ({
  type: SET_STNAMES,
  payload: stnames,
})

export const getLocations = dispatch => {
  axios.get('/api/locations')
    .then(resp => {
      const locations = resp.data;
      dispatch(setLocations(locations))
    })
    .catch(error => console.log(error));
}

export const getStNames = dispatch => {
  axios.get('/api/states/locationsdropdown')
    .then(resp => {
      const stnames = resp.data;
dispatch(setStnames(stnames))
    })
    .catch(error => console.log(error));
}


