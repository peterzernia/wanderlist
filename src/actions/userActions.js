import axios from 'axios'
import { fetchTripReports, fetchUserTripReports } from './tripReportActions'

// Fetch authenticated user axios actions
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

// Fetch single user axios actions for viewing proflile
export const fetchSingleUserPending = () => {
  return {
    type: "FETCH_SINGLE_USER_PENDING"
  }
}

export const fetchSingleUserFulfilled = user => {
  return {
    type: "FETCH_SINGLE_USER_FULFILLED",
    user: user
  }
}

export const fetchSingleUserRejected = () => {
  return {
    type: "FETCH_SINGLE_USER_REJECTED",
  }
}


// GET requests the Django REST API, which returns authenticated user object.
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
export const putUserData = (username, email, countries, home, biography, success) => {
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
        dispatch({type: "ADD_SUCCESS", success: success});
      })
      .catch(err => {
        dispatch(putUserDataRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}

// GET requests the Django REST API, which returns user object from List View.
export const fetchSingleUser = (username) => {
  return dispatch => {
    dispatch(fetchSingleUserPending());
    axios.get(`http://localhost:8000/api/v1/users/?search=${username}`)
      .then(response => {
        const user = response.data;
        dispatch(fetchSingleUserFulfilled(user));
      })
      .catch(err => {
        dispatch(fetchSingleUserRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}
