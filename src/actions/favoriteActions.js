import axios from 'axios'

export const toggleFavorite = (tripReport) => {
  return dispatch => {
    const token = localStorage.getItem('token');
    //dispatch(toggleFavoritePending());
    axios.get(`http://localhost:8000/api/v1/reports/${tripReport}/favorite/`, {headers: { 'Authorization': `Token ${token}`}})
      .then(response => {
        console.log(response.data)
        //dispatch(toggleFavoriteFulfilled());
      })
      .catch(err => {
        //dispatch(toggleFavoriteRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}
