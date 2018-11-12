const initialState = {
  fetching: false,
  fetched: false,
  fetchingTripReports: false,
  fetchedTripReports: false,
  adding: false,
  added: false,
  user: {},
  tripReports: [],
  error: null,
}

/* Reducer Function*/
export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_USER_PENDING": {
      return {
        ...state,
        fetching: true
      }
    }
    case "FETCH_USER_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.user
      }
    }
    case "FETCH_USER_REJECTED": {
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
        tripReports: action.tripReports
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
    case "PUT_USER_DATA_PENDING": {
      return {
        ...state,
        adding: true,
        added: false,
      }
    }
    case "PUT_USER_DATA_FULFILLED": {
      return {
        ...state,
        adding: false,
        added: true,
        user: action.user
      }
    }
    case "PUT_USER_DATA_REJECTED": {
      return {
        ...state,
        adding: false,
        added: false,
        error: action.error
      }
    }
    default:
      return state
  }
}
