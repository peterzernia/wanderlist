const initialState = {
  token: null,
  authenticating: false,
  authenticated: false,
  error: null
}

/* Reducer Function*/
export default function (state = initialState, action) {
  switch (action.type) {
    case "AUTH_START": {
      return {
        ...state,
        authenticating: true
      }
    }
    case "AUTH_SUCESS": {
      return {
        ...state,
        authenticating: false,
        authenticated: true,
        token: action.token
      }
    }
    case "AUTH_FAIL": {
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        error: action.error
      }
    }
    case "AUTH_LOGOUT": {
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        token: null
      }
    }
    default:
      return state
  }
}
