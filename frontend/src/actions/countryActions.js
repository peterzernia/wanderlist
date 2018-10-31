import axios from 'axios'

export function fetchCountry(store, query) {
  const url = `http://localhost:8000/api/v1/countries/?search=${query}`
  store.dispatch((dispatch, query) => {
    dispatch({type: "FETCH_COUNTRY_PENDING"})
    axios.get(url)
      .then((response) => {
        dispatch({type: "FETCH_COUNTRY_FULFILLED", payload: response.data})
      })
      .catch((err) => {
        dispatch({type: "FETCH_USERS_REJECTED", payload: err})
      })
  })
}
