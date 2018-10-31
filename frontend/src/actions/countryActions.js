import axios from 'axios'

export function fetchCountry(query) {
  return function(dispatch) {
    axios.get(`http://localhost:8000//api/v1/countries/?search=${query}`)
      .then((response) => {
        dispatch({type: "FETCH_COUNTRY_FULFILLED", payload: response.data})
      })
      .catch((err ) => {
        dispatch({type: "FETCH_USERS_REJECTED", payload: response.data})
      })
  }
}
