const initialState = {
  showCountryModal: false,
  showProfileModal: false,
  showPostModal: false,
  modalCountry: {},
  modalProfile: {}
}

/* Reducer Function*/
export default function (state = initialState, action) {
  switch (action.type) {
    case "OPEN_COUNTRY_MODAL": {
      return {
        ...state,
        showCountryModal: true,
        modalCountry: action.modalCountry
      }
    }
    case "CLOSE_COUNTRY_MODAL": {
      return {
        ...state,
        showCountryModal: false
      }
    }
    case "OPEN_PROFILE_MODAL": {
      return {
        ...state,
        showProfileModal: true,
        modalProfile: action.modalProfile
      }
    }
    case "CLOSE_PROFILE_MODAL": {
      return {
        ...state,
        showProfileModal: false
      }
    }
    case "OPEN_POST_MODAL": {
      return {
        ...state,
        showPostModal: true
      }
    }
    case "CLOSE_POST_MODAL": {
      return {
        ...state,
        showPostModal: false
      }
    }
    default:
      return state
  }
}
