import axios from 'axios'

export const fetchTripReportsPending = () => {
  return {
    type: "FETCH_TRIP_REPORTS_PENDING"
  }
}

export const fetchTripReportsFulfilled = tripReports => {
  return {
    type: "FETCH_TRIP_REPORTS_FULFILLED",
    tripReports: tripReports
  }
}

export const fetchTripReportsRejected = error => {
  return {
    type: "FETCH_TRIP_REPORTS_REJECTED",
    error: error
  }
}

export const postTripReportsPending = () => {
  return {
    type: "POST_TRIP_REPORTS_PENDING"
  }
}

export const postTripReportsFulfilled = () => {
  return {
    type: "POST_TRIP_REPORTS_FULFILLED"
  }
}

export const postTripReportsRejected = error => {
  return {
    type: "FETCH_TRIP_REPORTS_REJECTED",
    error: error
  }
}

export const fetchTripReports = () => {
  return dispatch => {
    dispatch(fetchTripReportsPending());
    axios.get('http://localhost:8000/api/v1/reports/')
      .then(response => {
        const user = response.data;
        dispatch(fetchTripReportsFulfilled(user));
      })
      .catch(err => {
        dispatch(fetchTripReportsRejected(err));
      })
  }
}

export const postTripReport = (author, title, content, countries) => {
  return dispatch => {
    dispatch(postTripReportsPending());
    axios.post('http://localhost:8000/api/v1/reports/', {
      title: title,
      content: content,
      author: author,
      countries: countries
    })
      .then(response => {
        const user = response.data;
        dispatch(postTripReportsFulfilled(user));
      })
      .catch(err => {
        dispatch(postTripReportsRejected(err));
      })
  }
}
