const initialState = {
  collapsed: true,
}

/* Reducer Function*/
export default function (state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_NAVBAR": {
      return {
        ...state,
        collapsed: !state.collapsed
      }
    }
    default:
      return state
  }
}
