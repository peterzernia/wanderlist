const initialState = {
  error: null,
  success: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ERROR': {
      return {
        ...state,
        error: action.error,
      }
    }
    case 'REMOVE_ERROR': {
      return {
        ...state,
        error: null,
        success: null,
      }
    }
    case 'ADD_SUCCESS': {
      return {
        ...state,
        success: action.success,
      }
    }
    default:
      return state
  }
}
