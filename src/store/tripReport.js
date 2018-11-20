const initialState = {
  fetching: false,
  fetched: false,
  fetchingTripReports: false,
  fetchedTripReports: false,
  tripReports: [],
  userTripReports: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetching: true,
      }
    }
    case "FETCH_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        tripReports: action.tripReports,
      }
    }
    case "FETCH_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetching: false,
        fetched: false,
      }
    }
    case "FETCH_USER_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetchingTripReports: true,
        fetchedTripReports: false
      }
    }
    case "FETCH_USER_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        fetchingTripReports: false,
        fetchedTripReports: true,
        userTripReports: action.tripReports,
      }
    }
    case "FETCH_USER_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetchingTripReports: false,
        fetchedTripReports: false,
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
        // The new trip report must be added onto the array, then the array must be sorted by id.
        userTripReports: [...state.userTripReports].concat(action.response).sort((a, b) => a.id < b.id),
        tripReports: [...state.tripReports].concat(action.response).sort((a, b) => a.id < b.id),
      }
    }
    case "POST_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
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
        // The deleted post must be filtered out of the lists.
        userTripReports: state.userTripReports.filter(tripReport => tripReport.id !== action.response.id),
        tripReports: state.tripReports.filter(tripReport => tripReport.id !== action.response.id),
      }
    }
    case "DELETE_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
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
        // The old post must be filtered out, the updated post must be added, then the array must be sorted.
        userTripReports: [...state.userTripReports].filter(tripReport => tripReport.id !== action.response.id).concat(action.response).sort((a, b) => a.id < b.id),
        tripReports: [...state.tripReports].filter(tripReport => tripReport.id !== action.response.id).concat(action.response).sort((a, b) => a.id < b.id),
      }
    }
    case "UPDATE_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
      }
    }
    default:
      return state
  }
}
