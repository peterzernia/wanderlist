import axios from 'axios'

// Action creators
export const fetchCountryPending = () => ({type: "FETCH_COUNTRY_PENDING"})
export const fetchCountryFulfilled = country => ({type: "FETCH_COUNTRY_FULFILLED", country})
export const fetchCountryRejected = () => ({type: "FETCH_COUNTRY_REJECTED"})


// GET requests the Django REST API which returns country object(s).
export const fetchCountry = (query) => {
  return dispatch => {
    dispatch(fetchCountryPending());
    return axios.get(`${process.env.REACT_APP_API_URL}/api/v1/countries/?search=${query}`)
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
