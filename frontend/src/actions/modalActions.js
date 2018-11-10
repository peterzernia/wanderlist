export const openCountryModal = modalCountry => {
  return dispatch => {
    dispatch({ type: "OPEN_COUNTRY_MODAL", modalCountry: modalCountry })
  }
}

export const closeCountryModal = () => {
  return dispatch => {
    dispatch({ type: "CLOSE_COUNTRY_MODAL" })
  }
}

export const openProfileModal = modalProfile => {
  return dispatch => {
    dispatch({ type: "OPEN_PROFILE_MODAL", modalProfile: modalProfile })
  }
}

export const closeProfileModal = () => {
  return dispatch => {
    dispatch({ type: "CLOSE_PROFILE_MODAL" })
  }
}
