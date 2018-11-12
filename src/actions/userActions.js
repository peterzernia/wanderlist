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

export const fetchUserTripReportsPending = () => {
  return {
    type: "FETCH_USER_TRIP_REPORTS_PENDING"
  }
}

export const fetchUserTripReportsFulfilled = tripReports => {
  return {
    type: "FETCH_USER_TRIP_REPORTS_FULFILLED",
    tripReports: tripReports
  }
}

export const fetchUserTripReportsRejected = error => {
  return {
    type: "FETCH_USER_TRIP_REPORTS_REJECTED",
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

/*
GET requests the Django REST API, which returns user object.
*/
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

export const fetchUserTripReports = (username) => {
  return dispatch => {
    dispatch(fetchUserTripReportsPending());
    axios.get(`http://localhost:8000/api/v1/reports/?search=${username}`)
      .then(response => {
        const tripReports = response.data;
        dispatch(fetchUserTripReportsFulfilled(tripReports));
      })
      .catch(err => {
        dispatch(fetchUserTripReportsRejected(err));
      })
  }
}

export const putUserData = (username, countries, email) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch(putUserDataPending());
    axios.put(
      'http://localhost:8000/api/v1/rest-auth/user/',
      {
        username: username,
        countries: countries,
        email: email,
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
