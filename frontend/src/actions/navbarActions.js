export const toggleNavBar = () => {
  return dispatch => {
    dispatch({ type: "TOGGLE_NAVBAR" })
  }
}
