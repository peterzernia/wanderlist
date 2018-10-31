const initialState = {
  fetching: false,
  fetched: false,
  country: {},
  error: null,
}

/* Reducer Function*/
export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_COUNTRY_PENDING": {
      return {
        ...state,
        fetching: true
      }
    }
    case "FETCH_COUNTRY_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        country: action.payload
      }
    }
    case "FETCH_COUNTRY_REJECTED": {
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload
      }
    }
    default:
      return state
  }
}
