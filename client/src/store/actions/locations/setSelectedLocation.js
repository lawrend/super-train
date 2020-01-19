import axios from 'axios';

//set Selected State of the U.S. from dropdown
//or resets selected state to "None"
export const SET_SELECTED_ST = "SET_SELECTED_ST";
export const RESET_SELECTED_ST = "RESET_SELECTED_ST";

export function setSelectedSt(selectedSt) {
  if (selectedSt != null) {
    return {
      type: SET_SELECTED_ST,
      payload: selectedSt,
    }
  } else {
    return {
      type: RESET_SELECTED_ST
    }
  }
}

// set all protected areas for the selected state
export const SET_SELECTED_ST_LOCATIONS = "SET_SELECTED_ST_LOCATIONS";
export const setSelectedStLocations = selectedStLocations => ({
  type: SET_SELECTED_ST_LOCATIONS,
  payload: selectedStLocations,
})

// pull and set all protected areas for selected state
export const getSelectedStLocations = st => dispatch => {
  if(st !== null && st !== "None") {
    axios.get('/api/states/locations/' + st)
      .then(resp => {
        const locations = resp.data;
        dispatch(setSelectedStLocations(locations))
      })
      .catch(error => console.log(error));
  }
  else {
    dispatch(setSelectedStLocations([]))
  }
}

