const initialState = {
  fetching: false,
  fetched: false,
  fetchingNext: false,
  fetchedNext: false,
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
    // In the case of fetching the next page of trip reports, the trip reports
    // need to be added to the original list, not overwnite the original list.
    case "FETCH_NEXT_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetchingNext: true,
        fetchedNext: false
      }
    }
    case "FETCH_NEXT_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        fetchingNext: false,
        fetchedNext: true,
        tripReports: {
          count: action.tripReports.count,
          next: action.tripReports.next,
          previous: action.tripReports.previous,
          results: [...state.tripReports.results].concat(action.tripReports.results),
        }
      }
    }
    case "FETCH_NEXT_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetchingNext: false,
        fetchedNext: false,
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
    case "FETCH_NEXT_USER_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetchingNext: true,
        fetchedNext: false
      }
    }
    case "FETCH_NEXT_USER_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        fetchingNext: false,
        fetchedNext: true,
        userTripReports: {
          count: action.tripReports.count,
          next: action.tripReports.next,
          previous: action.tripReports.previous,
          results: [...state.tripReports.results].concat(action.tripReports.results),
        }
      }
    }
    case "FETCH_NEXT_USER_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetchingNext: false,
        fetchedNext: false,
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
        userTripReports: {
          results: [...state.userTripReports.results].concat(action.response).sort((a, b) => a.id < b.id)
        },
        tripReports: {
          results: [...state.tripReports.results].concat(action.response).sort((a, b) => a.id < b.id)
        }
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
        userTripReports: {
          results: [...state.userTripReports.results].filter(tripReport => tripReport.id !== action.response.id)
        },
        tripReports: {
          results: [...state.tripReports.results].filter(tripReport => tripReport.id !== action.response.id)
        }
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
        userTripReports: {
          results: [...state.userTripReports.results].filter(tripReport => tripReport.id !== action.response.id).concat(action.response).sort((a, b) => a.id < b.id)
        },
        tripReports: {
          results: [...state.tripReports.results].filter(tripReport => tripReport.id !== action.response.id).concat(action.response).sort((a, b) => a.id < b.id)
        }
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
