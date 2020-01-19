import axios from 'axios';

export const GET_ALL_LOCATIONS_FOR_SPECIES = "GET_ALL_LOCATIONS_FOR_SPECIES";

export const getAllLocationsForSpecies = spec => dispatch => {axios.get('/api/species/locations/' + spec)
    .then(resp => {
      const locs = resp.data; dispatch(setAllLocationsForSpecies(locs))
    })
    .catch(error => console.log(error))
}


export const SET_ALL_LOCATIONS_FOR_SPECIES = "SET_ALL_LOCATIONS_FOR_SPECIES";

export const setAllLocationsForSpecies = allSpeciesLocations => ({
  type: SET_ALL_LOCATIONS_FOR_SPECIES,
  payload: allSpeciesLocations,
})
