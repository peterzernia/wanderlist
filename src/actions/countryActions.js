import axios from 'axios'

// Fetch country axios actions
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

export const fetchCountryRejected = () => {
  return {
    type: "FETCH_COUNTRY_REJECTED"
  }
}


// GET requests the Django REST API which returns country object(s).
export const fetchCountry = (query) => {
  return dispatch => {
    dispatch(fetchCountryPending());
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/countries/?search=${query}`)
      .then(response => {
        const country = response.data;
        dispatch(fetchCountryFulfilled(country));
      })
      .catch(err => {
        dispatch(fetchCountryRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}
