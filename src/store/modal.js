const initialState = {
  showCountryModal: false,
  showEditProfileModal: false,
  showPostModal: false,
  updatePostModal: false,
  showConfirmDeleteModal: false,
  showTripReportModal: false,
  showNotAuthModal: false,
  modalCountry: {},
  modalProfile: {},
  modalPost: {}
}

/* Reducer Function*/
export default function (state = initialState, action) {
  switch (action.type) {
    // Country modal
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
    // Edit Profile modal
    case "OPEN_EDIT_PROFILE_MODAL": {
      return {
        ...state,
        showEditProfileModal: true,
        modalProfile: action.modalProfile
      }
    }
    case "CLOSE_EDIT_PROFILE_MODAL": {
      return {
        ...state,
        showEditProfileModal: false
      }
    }
    // Post modal
    case "OPEN_POST_MODAL": {
      return {
        ...state,
        showPostModal: true
      }
    }
    case "OPEN_UPDATE_POST_MODAL": {
      return {
        ...state,
        showPostModal: true,
        updatePostModal: true,
        modalPost: action.modalPost
      }
    }
    case "CLOSE_POST_MODAL": {
      return {
        ...state,
        showPostModal: false,
        updatePostModal: false
      }
    }
    // Confirm Delete modal
    case "OPEN_CONFIRM_DELETE_MODAL": {
      return {
        ...state,
        showConfirmDeleteModal: true,
        modalPost: action.modalPost
      }
    }
    case "CLOSE_CONFIRM_DELETE_MODAL": {
      return {
        ...state,
        showConfirmDeleteModal: false,
      }
    }
    // Trip Report modal
    case "OPEN_TRIP_REPORT_MODAL": {
      return {
        ...state,
        showTripReportModal: true,
        modalPost: action.modalPost
      }
    }
    case "CLOSE_TRIP_REPORT_MODAL": {
      return {
        ...state,
        showTripReportModal: false,
      }
    }
    // Not Authenticated modal
    case "OPEN_NOT_AUTH_MODAL": {
      return {
        ...state,
        showNotAuthModal: true,
      }
    }
    case "CLOSE_NOT_AUTH_MODAL": {
      return {
        ...state,
        showNotAuthModal: false,
      }
    }
    default:
      return state
  }
}
