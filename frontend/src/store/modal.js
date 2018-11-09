const initialState = {
  showModal: false
}

/* Reducer Function*/
export default function (state = initialState, action) {
  switch (action.type) {
    case "OPEN_MODAL": {
      return {
        ...state,
        showModal: true
      }
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        showModal: false
      }
    }
    default:
      return state
  }
}
