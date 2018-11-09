const initialState = {
  showModal: false,
  modalCountry: []
}

/* Reducer Function*/
export default function (state = initialState, action) {
  switch (action.type) {
    case "OPEN_MODAL": {
      return {
        ...state,
        showModal: true,
        modalCountry: action.modalCountry
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
