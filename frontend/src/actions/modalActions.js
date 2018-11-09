export const openModal = modalCountry => {
  return dispatch => {
    dispatch({ type: "OPEN_MODAL", modalCountry: modalCountry })
  }
}

export const closeModal = () => {
  return dispatch => {
    dispatch({ type: "CLOSE_MODAL" })
  }
}
