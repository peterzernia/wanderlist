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

export const openPostModal = modalProfile => {
  return dispatch => {
    dispatch({ type: "OPEN_POST_MODAL" })
  }
}

export const closePostModal = () => {
  return dispatch => {
    dispatch({ type: "CLOSE_POST_MODAL" })
  }
}
