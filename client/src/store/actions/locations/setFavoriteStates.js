import axios from 'axios';

export const SET_FAVORITE_STATES = "SET_FAVORITE_STATES";
// const setFavoriteStates = states => ({
//   type: SET_FAVORITE_STATES,
//   payload: states
// })

export const setFavoriteStates = locations => dispatch => {
  axios.post('/api/states/set_favorite_states', {
  favorites: locations
  })
    .then(dispatch(getFavoriteStates())
    )
    .catch(err => console.log(err))
}

export const GET_FAVORITE_STATES = "GET_FAVORITE_STATES";

export const getFavoriteStates = dispatch => {
  axios.get('/api/states/get_favorite_states'
  )
    .then(resp => console.log(resp.data))
    .catch(err => console.log(err))
}


