import axios from 'axios'

export const fetchUserPending = () => {
  return {
    type: "FETCH_USER_PENDING"
  }
}

export const fetchUserFulfilled = country => {
  return {
    type: "FETCH_USER_FULFILLED",
    country: country
  }
}

export const fetchUserRejected = error => {
  return {
    type: "FETCH_USER_REJECTED",
    error: error
  }
}

export const fetchUser = () => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch(fetchUserPending());
    axios.get('http://localhost:8000/api/v1/rest-auth/user/', {headers: { 'authorization': `Bearer ${token}`}})
      .then(response => {
        const user = response.data;
        dispatch(fetchUserFulfilled(user));
      })
      .catch(err => {
        dispatch(fetchUserRejected(err));
      })
  }
}
