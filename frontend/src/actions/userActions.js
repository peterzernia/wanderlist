import axios from 'axios'

export const fetchUserPending = () => {
  return {
    type: "FETCH_USER_PENDING"
  }
}

export const fetchUserFulfilled = user => {
  return {
    type: "FETCH_USER_FULFILLED",
    user: user
  }
}

export const fetchUserRejected = error => {
  return {
    type: "FETCH_USER_REJECTED",
    error: error
  }
}

export const addCountryPending = () => {
  return {
    type: "ADD_COUNTRY_PENDING"
  }
}

export const addCountryFulfilled = user => {
  return {
    type: "ADD_COUNTRY_FULFILLED",
    user: user
  }
}

export const addCountryRejected = error => {
  return {
    type: "ADD_COUNTRY_REJECTED",
    error: error
  }
}

export const fetchUser = () => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch(fetchUserPending());
    axios.get('http://localhost:8000/api/v1/rest-auth/user/', {headers: { 'Authorization': `Token ${token}`}})
      .then(response => {
        const user = response.data;
        dispatch(fetchUserFulfilled(user));
      })
      .catch(err => {
        dispatch(fetchUserRejected(err));
      })
  }
}

export const addCountry = (username, countries) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch(addCountryPending());
    axios.put(
      'http://localhost:8000/api/v1/rest-auth/user/',
      {
        countries: countries,
        username: username
      },
      {headers: { 'Authorization': `Token ${token}`}}
  )
      .then(response => {
        const user = response.data;
        dispatch(addCountryFulfilled(user));
      })
      .catch(err => {
        dispatch(addCountryRejected(err));
      })
  }
}
