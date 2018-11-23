const initialState = {
  fetching: false,
  fetched: false,
  adding: false,
  added: false,
  fetchingSingleUser: false,
  fetchedSingleUser: false,
  user: {},
  singleUser: {},
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
      }
    }
    // Axios put
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
      }
    }
    case "FETCH_SINGLE_USER_PENDING": {
      return {
        ...state,
        fetchingSingleUser: true
      }
    }
    /*
    API search returns an array of 1 object, since the search parameter is an
    exact match.
    */
    case "FETCH_SINGLE_USER_FULFILLED": {
      return {
        ...state,
        fetchingSingleUser: false,
        fetchedSingleUser: true,
        singleUser: action.user[0]
      }
    }
    case "FETCH_SINGLE_USER_REJECTED": {
      return {
        ...state,
        fetchingSingleUser: false,
        fetchedSingleUser: false,
      }
    }
    default:
      return state
  }
}
