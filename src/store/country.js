const initialState = {
  fetching: false,
  fetched: false,
  country: [],
}

/* Reducer Function*/
export default function (state = initialState, action) {
  switch (action.type) {
    case "FETCH_COUNTRY_PENDING": {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }
    case "FETCH_COUNTRY_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        country: action.country,
      }
    }
    case "FETCH_COUNTRY_REJECTED": {
      return {
        ...state,
        fetching: false,
        fetched: false,
      }
    }
    default:
      return state
  }
}
