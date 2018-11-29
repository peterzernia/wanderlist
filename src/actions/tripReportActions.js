import axios from 'axios'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

// For fetching the first page of all of the users Trip Reports
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

export const fetchTripReportsRejected = () => {
  return {
    type: "FETCH_TRIP_REPORTS_REJECTED"
  }
}

// For fetching the next page of all of the users Trip Reports
export const fetchNextTripReportsPending = () => {
  return {
    type: "FETCH_NEXT_TRIP_REPORTS_PENDING"
  }
}

export const fetchNextTripReportsFulfilled = tripReports => {
  return {
    type: "FETCH_NEXT_TRIP_REPORTS_FULFILLED",
    tripReports: tripReports
  }
}

export const fetchNextTripReportsRejected = () => {
  return {
    type: "FETCH_NEXT_TRIP_REPORTS_REJECTED"
  }
}

// For fetching the first page of Trip Reports of the authenticated user
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

export const fetchUserTripReportsRejected = () => {
  return {
    type: "FETCH_USER_TRIP_REPORTS_REJECTED",
  }
}

// For fetching the next page of the authenticated users Trip Reports
export const fetchNextUserTripReportsPending = () => {
  return {
    type: "FETCH_NEXT_USER_TRIP_REPORTS_PENDING"
  }
}

export const fetchNextUserTripReportsFulfilled = tripReports => {
  return {
    type: "FETCH_NEXT_USER_TRIP_REPORTS_FULFILLED",
    tripReports: tripReports
  }
}

export const fetchNextUserTripReportsRejected = () => {
  return {
    type: "FETCH_NEXT_USER_TRIP_REPORTS_REJECTED"
  }
}

// For the authenticated user to POST request a new trip report
export const postTripReportsPending = () => {
  return {
    type: "POST_TRIP_REPORTS_PENDING"
  }
}

export const postTripReportsFulfilled = response => {
  return {
    type: "POST_TRIP_REPORTS_FULFILLED",
    response: response
  }
}

export const postTripReportsRejected = () => {
  return {
    type: "POST_TRIP_REPORTS_REJECTED",
  }
}

// For the authenticated user to delete a Trip Report of theirs
export const deleteTripReportsPending = () => {
  return {
    type: "DELETE_TRIP_REPORTS_PENDING"
  }
}

export const deleteTripReportsFulfilled = response => {
  return {
    type: "DELETE_TRIP_REPORTS_FULFILLED",
    response: response
  }
}

export const deleteTripReportsRejected = () => {
  return {
    type: "DELETE_TRIP_REPORTS_REJECTED",
  }
}

// For the authenticated user to update a Trip Report of theirs
export const updateTripReportsPending = () => {
  return {
    type: "UPDATE_TRIP_REPORTS_PENDING"
  }
}

export const updateTripReportsFulfilled = response => {
  return {
    type: "UPDATE_TRIP_REPORTS_FULFILLED",
    response: response
  }
}

export const updateTripReportsRejected = () => {
  return {
    type: "UPDATE_TRIP_REPORTS_REJECTED",
  }
}

// For fetching the post based off slug
export const fetchSlugTripReportsPending = () => {
  return {
    type: "FETCH_SLUG_TRIP_REPORTS_PENDING"
  }
}

export const fetchSlugTripReportsFulfilled = tripReports => {
  return {
    type: "FETCH_SLUG_TRIP_REPORTS_FULFILLED",
    tripReports: tripReports
  }
}

export const fetchSlugTripReportsRejected = () => {
  return {
    type: "FETCH_SLUG_TRIP_REPORTS_REJECTED",
  }
}

/*
GET requests the Django REST API and returns the first page of a list of Trip
Reports. The passed in url can have filter parameters added.
*/
export const fetchTripReports = (url) => {
  return dispatch => {
    dispatch(fetchTripReportsPending());
    axios.get(url)
      .then(response => {
        const tripReports = response.data;
        dispatch(fetchTripReportsFulfilled(tripReports));
      })
      .catch(err => {
        dispatch(fetchTripReportsRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}

/*
Since the Trip Reports are paginated, the original axios call returns an object
with a Next variable that contains the link API of the the next page, which is
passed into this function to GET the next Trip Reports.
*/
export const fetchNextTripReports = (url) => {
  return dispatch => {
    dispatch(fetchNextTripReportsPending());
    axios.get(url)
      .then(response => {
        const tripReports = response.data;
        dispatch(fetchNextTripReportsFulfilled(tripReports));
      })
      .catch(err => {
        dispatch(fetchNextTripReportsRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}

/*
GET requests the Django REST API with the parameter of username to return the
first page of the list of the Users TripReports.
*/
export const fetchUserTripReports = (username) => {
  return dispatch => {
    dispatch(fetchUserTripReportsPending());
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/reports/?ordering=-pk&search=${username}`)
      .then(response => {
        const tripReports = response.data;
        dispatch(fetchUserTripReportsFulfilled(tripReports));
      })
      .catch(err => {
        dispatch(fetchUserTripReportsRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}

/*
Again, the paginated API returns a next variable that is the url to the next
page, which is passed into this function to retrieve the next page of the user's
Trip Reports.
*/
export const fetchNextUserTripReports = (url) => {
  return dispatch => {
    dispatch(fetchNextUserTripReportsPending());
    axios.get(url)
      .then(response => {
        const tripReports = response.data;
        dispatch(fetchNextUserTripReportsFulfilled(tripReports));
      })
      .catch(err => {
        dispatch(fetchNextUserTripReportsRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}

/*
POST requests a new trip report to the Django REST API by the authenticated
user.
*/
export const postTripReport = (author, title, content, countries, image) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch(postTripReportsPending());
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    formData.append('countries', countries);
    // If image is undefined, no image is POSTed.
    if (image) {
      formData.append('image', image);
    }
    axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/reports/`,formData,
      {headers: { 'Authorization': `Token ${token}`}}
    )
      .then(response => {
        dispatch(postTripReportsFulfilled(response.data));
      })
      .catch(err => {
        dispatch(postTripReportsRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}

// DELETES a post of the authenticated user on the API.
export const deleteTripReport = (tripReport) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch(deleteTripReportsPending());
    axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/reports/${tripReport.id}/`, {headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': 'csrftoken',
      'Authorization': `Token ${token}`
    }})
      .then(response => {
        dispatch(deleteTripReportsFulfilled(tripReport));
        dispatch({type: "ADD_SUCCESS", success: 'Your post has been deleted.'});
      })
      .catch(err => {
        dispatch(deleteTripReportsRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}

// UPDATEs a post of the authenticated user on the API.
export const updateTripReport = (tripReport, author, title, content, countries, image) => {
  const token = localStorage.getItem('token');
  return dispatch => {
    dispatch(updateTripReportsPending());
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('author', author);
    formData.append('countries', countries);
    // If image is field is left blank, the original image does not get updated or deleted.
    if (image) {
      formData.append('image', image);
    }
    axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/reports/${tripReport}/`, formData,
      {headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRFToken': 'csrftoken',
        'Authorization': `Token ${token}`
    }})
      .then(response => {
        dispatch(updateTripReportsFulfilled(response.data));
        dispatch({type: "ADD_SUCCESS", success: 'Your post has been updated.'});
      })
      .catch(err => {
        dispatch(updateTripReportsRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}

/*
Fetches a single Trip Report based on slug to display on the posts /p/${slug}/
page.
*/
export const fetchSlugTripReports = (slug) => {
  return dispatch => {
    dispatch(fetchSlugTripReportsPending());
    axios.get(`${process.env.REACT_APP_API_URL}/api/v1/reports/?search=${slug}`)
      .then(response => {
        const tripReports = response.data;
        dispatch(fetchSlugTripReportsFulfilled(tripReports));
      })
      .catch(err => {
        dispatch(fetchSlugTripReportsRejected());
        dispatch({type: "ADD_ERROR", error: err});
      })
  }
}
