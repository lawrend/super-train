//*******NOT USED??**********//
import axios from 'axios';

export const SET_SPECIES = "SET_SPECIES";

export const setSpecies = species => ({
  type:SET_SPECIES,
  payload: species,
})

export const getSpecies = dispatch => {
  axios.get('/api/species')
    .then(resp => {
      const species = resp.data;
      dispatch(setSpecies(species))
    })
    .catch(error => console.log(error));
}

