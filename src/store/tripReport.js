const initialState = {
  fetching: false,
  fetched: false,
  posting: false,
  posted: true,
  tripReports: [],
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
    case "POST_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        posting: true
      }
    }
    case "POST_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        posting: false,
        posted: true,
      }
    }
    case "POST_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        posting: false,
        posted: false,
        error: action.error
      }
    }
    default:
      return state
  }
}
