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

export const putCountryPending = () => {
  return {
    type: "PUT_COUNTRY_PENDING"
  }
}

export const putCountryFulfilled = user => {
  return {
    type: "PUT_COUNTRY_FULFILLED",
    user: user
  }
}

export const putCountryRejected = error => {
  return {
    type: "PUT_COUNTRY_REJECTED",
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

export const putCountry = (username, countries) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch(putCountryPending());
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
        dispatch(putCountryFulfilled(user));
      })
      .catch(err => {
        dispatch(putCountryRejected(err));
      })
  }
}
