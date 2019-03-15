const initialState = {
  posting: false,
  updating: false,
  fetching: false,
  fetched: false,
  fetchingNext: false,
  fetchedNext: false,
  fetchingUserNext: false,
  fetchedUserNext: false,
  fetchingTripReports: false,
  fetchedTripReports: false,
  fetchingSlugTripReports: false,
  fetchedSlugTripReports: false,
  fetchingFeaturedTripReport: false,
  fetchedFeaturedTripReport: false,
  tripReports: { results: [], count: null, next: null, previous: null },
  userTripReports: { results: [], count: null, next: null, previous: null },
  slugTripReports: [],
  featuredTripReport: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    // Basic axios request returns a response, and the state must be updated.
    case "FETCH_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetching: true
      };
    }
    case "FETCH_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        tripReports: action.tripReports
      };
    }
    case "FETCH_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetching: false,
        fetched: false
      };
    }
    /*
    In the case of fetching the next page of trip reports, the new trip reports
    need to be added to the list of existing, fetched trip reports. They must
    not overwnite the original list.
    */
    case "FETCH_NEXT_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetchingNext: true,
        fetchedNext: false
      };
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
          results: [...state.tripReports.results].concat(
            action.tripReports.results
          )
        }
      };
    }
    case "FETCH_NEXT_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetchingNext: false,
        fetchedNext: false
      };
    }
    // Basic axios request for fetching a user's Trip Reports
    case "FETCH_USER_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetchingTripReports: true,
        fetchedTripReports: false
      };
    }
    case "FETCH_USER_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        fetchingTripReports: false,
        fetchedTripReports: true,
        userTripReports: action.tripReports
      };
    }
    case "FETCH_USER_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetchingTripReports: false,
        fetchedTripReports: false
      };
    }
    /*
    In the case of fetching the next page of the user's trip reports, the new
    trip reports need to be added to the list of existing, fetched trip reports.
    They must not overwnite the original list.
    */
    case "FETCH_NEXT_USER_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetchingUserNext: true,
        fetchedUserNext: false
      };
    }
    case "FETCH_NEXT_USER_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        fetchingUserNext: false,
        fetchedUserNext: true,
        userTripReports: {
          count: action.tripReports.count,
          next: action.tripReports.next,
          previous: action.tripReports.previous,
          results: [...state.userTripReports.results].concat(
            action.tripReports.results
          )
        }
      };
    }
    case "FETCH_NEXT_USER_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetchingUserNext: false,
        fetchedUserNext: false
      };
    }
    // Axios post
    case "POST_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        posting: true
      };
    }
    case "POST_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        /*
        The axios response is a single trip report. The new trip report must be
        added onto the array, then the array must be sorted by id for both the
        Trip Reports and User Trip Reports lists.
        */
        userTripReports: {
          results: [...state.userTripReports.results]
            .concat(action.response)
            .sort((a, b) => a.id < b.id),
          count: state.userTripReports.count,
          next: state.userTripReports.next,
          previous: state.userTripReports.previous
        },
        tripReports: {
          results: [...state.tripReports.results]
            .concat(action.response)
            .sort((a, b) => a.id < b.id),
          count: state.tripReports.count,
          next: state.tripReports.next,
          previous: state.tripReports.previous
        },
        posting: false
      };
    }
    case "POST_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        posting: false
      };
    }
    // Axios delete
    case "DELETE_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        /*
        The response is the deleted post that must be filtered out of both
        lists.
        */
        userTripReports: {
          results: [...state.userTripReports.results].filter(
            tripReport => tripReport.id !== action.response.id
          ),
          count: state.userTripReports.count,
          next: state.userTripReports.next,
          previous: state.userTripReports.previous
        },
        tripReports: {
          results: [...state.tripReports.results].filter(
            tripReport => tripReport.id !== action.response.id
          ),
          count: state.tripReports.count,
          next: state.tripReports.next,
          previous: state.tripReports.previous
        }
      };
    }
    case "UPDATE_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        updating: true
      };
    }
    case "UPDATE_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        /*
        The axios response is the updated post. The old, unupdated post must be
        filtered out of both lists, the updated post must be added, then
        the array must be sorted.
        */
        userTripReports: {
          results: [...state.userTripReports.results].map(
            tripReport =>
              tripReport.id === action.response.id
                ? { ...action.response }
                : { ...tripReport }
          ),
          count: state.userTripReports.count,
          next: state.userTripReports.next,
          previous: state.userTripReports.previous
        },
        tripReports: {
          results: [...state.tripReports.results].map(
            tripReport =>
              tripReport.id === action.response.id
                ? { ...action.response }
                : { ...tripReport }
          ),
          count: state.tripReports.count,
          next: state.tripReports.next,
          previous: state.tripReports.previous
        },
        updating: false
      };
    }
    case "UPDATE_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        updating: false
      };
    }
    case "FETCH_SLUG_TRIP_REPORTS_PENDING": {
      return {
        ...state,
        fetchingSlugTripReports: true,
        fetchedSlugTripReports: false
      };
    }
    case "FETCH_SLUG_TRIP_REPORTS_FULFILLED": {
      return {
        ...state,
        fetchingSlugTripReports: false,
        fetchedSlugTripReports: true,
        slugTripReports: action.tripReports.results
      };
    }
    case "FETCH_SLUG_TRIP_REPORTS_REJECTED": {
      return {
        ...state,
        fetchingSlugTripReports: false,
        fetchedSlugTripReports: false
      };
    }
    case "FETCH_FEATURED_TRIP_REPORT_PENDING": {
      return {
        ...state,
        fetchingFeaturedTripReport: true,
        fetchedFeaturedTripReport: false
      };
    }
    case "FETCH_FEATURED_TRIP_REPORT_FULFILLED": {
      return {
        ...state,
        fetchingFeaturedTripReport: false,
        fetchedFeaturedTripReport: true,
        featuredTripReport: action.tripReport.results
      };
    }
    case "FETCH_FEATURED_TRIP_REPORT_REJECTED": {
      return {
        ...state,
        fetchingFeaturedTripReport: false,
        fetchedFeaturedTripReport: false
      };
    }
    case "TOGGLE_FAVORITE_FULFILLED": {
      return {
        ...state,
        /*
        Same as PUT request, the response of the axios call to toggle favorite
        returns the new Trip Report object with updated favorites array. This
        Trip Report favoriters must replace the old Trip Report favoriters.
        User Trip Reports do not need to be updated since a favorite button is
        never shown for that array.
        */
        tripReports: {
          // Since order matters, only the specific index of the array should be changed.
          results: [...state.tripReports.results].map(
            tripReport =>
              tripReport.id === action.response.id
                ? { ...tripReport, favoriters: action.response.favoriters }
                : { ...tripReport }
          ),
          count: state.tripReports.count,
          next: state.tripReports.next,
          previous: state.tripReports.previous
        },
        slugTripReports: [...state.slugTripReports].map(
          tripReport =>
            tripReport.id === action.response.id
              ? { ...tripReport, favoriters: action.response.favoriters }
              : { ...tripReport }
        ),
        featuredTripReport: [...state.featuredTripReport].map(
          tripReport =>
            tripReport.id === action.response.id
              ? { ...tripReport, favoriters: action.response.favoriters }
              : { ...tripReport }
        )
      };
    }
    case "PUT_USER_DATA_FULFILLED": {
      return {
        ...state,
        tripReports: {
          results: [...state.tripReports.results].map(
            tripReport =>
              tripReport.author.pk === action.user.pk
                ? { ...tripReport, author: action.user }
                : { ...tripReport }
          ),
          count: state.tripReports.count,
          next: state.tripReports.next,
          previous: state.tripReports.previous
        },
        userTripReports: {
          results: [...state.userTripReports.results].map(
            tripReport =>
              tripReport.author.pk === action.user.pk
                ? { ...tripReport, author: action.user }
                : { ...tripReport }
          ),
          count: state.userTripReports.count,
          next: state.userTripReports.next,
          previous: state.userTripReports.previous
        }
      };
    }
    // Reset authenticated user trip reports array on logout.
    case "AUTH_LOGOUT": {
      return {
        ...state,
        userTripReports: {
          results: [],
          count: null,
          next: null,
          previous: null
        }
      };
    }
    default:
      return state;
  }
}
