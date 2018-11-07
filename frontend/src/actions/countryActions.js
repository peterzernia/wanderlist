import axios from 'axios'

export const fetchCountryPending = () => {
  return {
    type: "FETCH_COUNTRY_PENDING"
  }
}

export const fetchCountryFulfilled = country => {
  return {
    type: "FETCH_COUNTRY_FULFILLED",
    country: country
  }
}

export const fetchCountryRejected = error => {
  return {
    type: "FETCH_COUNTRY_REJECTED",
    error: error
  }
}

export function fetchCountry(store, query) {
  const url = `http://localhost:8000/api/v1/countries/?search=${query}`
  store.dispatch((dispatch) => {
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
