const initialState = {
  fetching: false,
  fetched: false,
  fetchingTripReports: false,
  fetchedTripReports: false,
  tripReports: [],
  userTripReports: [],
  response: null,
  error: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetching: true
      }
    }
    case "FETCH_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        tripReports: action.tripReports
      }
    }
    case "FETCH_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      }
    }
    case "FETCH_USER_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetchingTripReports: true
      }
    }
    case "FETCH_USER_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        fetchingTripReports: false,
        fetchedTripReports: true,
        userTripReports: action.tripReports
      }
    }
    case "FETCH_USER_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetchingTripReports: false,
        fetchedTripReports: false,
        error: action.error
      }
    }
    case "POST_TRIP_REPORTS_PENDING": {
      return {
        ...state,
      }
    }
    case "POST_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        response: action.response
      }
    }
    case "POST_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        error: action.error
        }
    }
    case "DELETE_TRIP_REPORTS_PENDING": {
      return {
        ...state,
      }
    }
    case "DELETE_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        response: action.response
      }
    }
    case "DELETE_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        error: action.error
      }
    }
    case "UPDATE_TRIP_REPORTS_PENDING": {
      return {
        ...state,
      }
    }
    case "UPDATE_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        response: action.response
      }
    }
    case "UPDATE_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        error: action.error
      }
    }
    default:
      return state
  }
}
