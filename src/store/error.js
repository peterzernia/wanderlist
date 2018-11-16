const initialState = {
  errors: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_ERROR": {
      return {
        ...state,
        errors: state.errors.concat([action.error])
      }
    }
    case "REMOVE_ERROR":{
      return {
        ...state,
        errors: [...state.errors].filter((error, i) => i !== action.index)
      }
    }
    default:
      return state;
  }
}
