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

export const putUserDataPending = () => {
  return {
    type: "PUT_USER_DATA_PENDING"
  }
}

export const putUserDataFulfilled = user => {
  return {
    type: "PUT_USER_DATA_FULFILLED",
    user: user
  }
}

export const putUserDataRejected = error => {
  return {
    type: "PUT_USER_DATA_REJECTED",
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

export const putUserData = (username, countries, home_country) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch(putUserDataPending());
    axios.put(
      'http://localhost:8000/api/v1/rest-auth/user/',
      {
        countries: countries,
        username: username,
        home_country: home_country
      },
      {headers: { 'Authorization': `Token ${token}`}}
  )
      .then(response => {
        const user = response.data;
        dispatch(putUserDataFulfilled(user));
      })
      .catch(err => {
        dispatch(putUserDataRejected(err));
      })
  }
}
