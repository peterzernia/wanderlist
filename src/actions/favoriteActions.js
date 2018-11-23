import axios from 'axios'

export const toggleFavoriteFulfilled = response => {
  return {
    type: "TOGGLE_FAVORITE_FULFILLED",
    response: response
  }
}

export const toggleFavoriteRejected = () => {
  return {
    type: "TOGGLE_FAVORITE_REJECTED"
  }
}

export const toggleFavorite = (tripReport) => {
  return dispatch => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:8000/api/v1/reports/${tripReport}/favorite/`, {headers: { 'Authorization': `Token ${token}`}})
      .then(response => {
        dispatch(toggleFavoriteFulfilled(response.data));
      })
      .catch(err => {
        dispatch(toggleFavoriteRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}
