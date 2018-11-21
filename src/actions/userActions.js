import axios from 'axios'
import { fetchTripReports, fetchUserTripReports } from './tripReportActions'

// Fetch user axios actions
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

export const fetchUserRejected = () => {
  return {
    type: "FETCH_USER_REJECTED",
  }
}

// PUT user axios actions for updating user information
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

export const putUserDataRejected = () => {
  return {
    type: "PUT_USER_DATA_REJECTED",
  }
}


// GET requests the Django REST API, which returns user object.
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
        dispatch(fetchUserRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}

// PUT requests the Django REST API to update user object.
export const putUserData = (username, email, countries, home, biography) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch(putUserDataPending());
    axios.put(
      'http://localhost:8000/api/v1/rest-auth/user/',
      {
        username: username,
        email: email,
        countries: countries,
        home: home,
        biography: biography
      },
      {headers: { 'Authorization': `Token ${token}`}}
  )
      .then(response => {
        const user = response.data;
        dispatch(putUserDataFulfilled(user));
        dispatch(fetchTripReports());
        dispatch(fetchUserTripReports(username));
        dispatch({type: "ADD_SUCCESS", success: 'Your profile has been updated.'});
      })
      .catch(err => {
        dispatch(putUserDataRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}
