const initialState = {
  showCountryModal: false,
  showProfileModal: false,
  showPostModal: false,
  updatePostModal: false,
  showConfirmDeleteModal: false,
  showTripReportModal: false,
  modalCountry: {},
  modalProfile: {},
  modalPost: {}
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
    default:
      return state
  }
}
