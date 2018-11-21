// Error action
export const removeError = () => {
  return dispatch => {
    dispatch({ type: "REMOVE_ERROR" })
  }
}
