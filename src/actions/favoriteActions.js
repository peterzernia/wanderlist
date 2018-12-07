import axios from 'axios'

// Action creators
export const toggleFavoriteFulfilled = response => ({type: "TOGGLE_FAVORITE_FULFILLED", response})
export const toggleFavoriteRejected = () => ({type: "TOGGLE_FAVORITE_REJECTED"})

export const toggleFavorite = (tripReport) => {
  return dispatch => {
    const token = localStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/reports/${tripReport}/favorite/`, {headers: { 'Authorization': `Token ${token}`}})
      .then(response => {
        dispatch(toggleFavoriteFulfilled(response.data));
      })
      .catch(err => {
        dispatch(toggleFavoriteRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}
