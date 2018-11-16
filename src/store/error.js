const initialState = {
  error: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_ERROR": {
      return {
        ...state,
        error: action.error
      }
    }
    case "REMOVE_ERROR":{
      return {
        ...state,
        error: null
      }
    }
    default:
      return state;
  }
}
