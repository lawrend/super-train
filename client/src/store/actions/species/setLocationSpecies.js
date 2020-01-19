import axios from 'axios';

export const SET_SELECTED_LOCATION_SPECIES = "SET_SELECTED_LOCATION_SPECIES";
const setSelectedStSpecies = locationSpecies => ({
  type:SET_SELECTED_LOCATION_SPECIES,
  payload: locationSpecies,
})

export const getSelectedStSpecies = name => dispatch => {
  axios.get('/api/locations/getspecies/' + name)
    .then(resp => {
      console.log(resp.data)
      const species = resp.data;
      dispatch (setSelectedStSpecies(species))
    })
    .catch(error => console.log(error));
}
