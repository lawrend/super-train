import axios from 'axios';

export const updateFavoriteStates = locations => dispatch => {
  axios.post('/api/states/update_favorite_states', {
    favorites: locations
  })
    .then(
      //resp is all current app level favorite states
      resp => {
        dispatch(setFavoriteStates(resp.data))
      }
    )
    .catch(err => console.log(err))
}

export const SET_FAVORITE_STATES = "SET_FAVORITE_STATES";
export const setFavoriteStates = faves => ({
  type: SET_FAVORITE_STATES,
  payload: faves
})

export const resetFavoriteStates = dispatch => {
  axios.get('/api/states/reset_favorite_states')
  .then(dispatch(setFavoriteStates([])))
}


