const initialState = {
  fetching: false,
  fetched: false,
  adding: false,
  added: false,
  user: {},
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
    case "ADD_COUNTRY_PENDING": {
      return {
        ...state,
        adding: true,
        added: false,
      }
    }
    case "ADD_COUNTRY_FULFILLED": {
      return {
        ...state,
        adding: false,
        added: true,
        user: action.user
      }
    }
    case "ADD_COUNTRY_REJECTED": {
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
