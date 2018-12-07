// Country modal action creators
export const openCountryModal = modalCountry => ({ type: "OPEN_COUNTRY_MODAL", modalCountry })
export const closeCountryModal = () => ({ type: "CLOSE_COUNTRY_MODAL" })

// Edit Profile modal action creators
export const openEditProfileModal = modalProfile => ({ type: "OPEN_EDIT_PROFILE_MODAL", modalProfile })
export const closeEditProfileModal = () => ({ type: "CLOSE_EDIT_PROFILE_MODAL" })

/*
There are two different actions that will open up the Post Modal. The first one
opens up the Post modal with a blank form and a Post Submit function, and the
second action passes in a trip report, and opens up the Post Modal with the forms
autofilled with the trip report's details. The submit function will update the
trip report.
*/
export const openPostModal = () => ({ type: "OPEN_POST_MODAL" })
export const openUpdatePostModal = modalPost => ({ type: "OPEN_UPDATE_POST_MODAL", modalPost })
export const closePostModal = () => ({ type: "CLOSE_POST_MODAL" })

// Confirm Delete modal action creators
export const openConfirmDeleteModal = modalPost =>({ type: "OPEN_CONFIRM_DELETE_MODAL", modalPost })
export const closeConfirmDeleteModal = () => ({ type: "CLOSE_CONFIRM_DELETE_MODAL" })

// Trip Report modal action creators
export const openTripReportModal = modalPost => ({ type: "OPEN_TRIP_REPORT_MODAL", modalPost })
export const closeTripReportModal = () => ({ type: "CLOSE_TRIP_REPORT_MODAL" })

// Not Authenticated modal action creators
export const openNotAuthModal = () => ({ type: "OPEN_NOT_AUTH_MODAL" })
export const closeNotAuthModal = () => ({ type: "CLOSE_NOT_AUTH_MODAL" })

// Copy Link modal action creators
export const openCopyLinkModal = modalLink => ({ type: "OPEN_COPY_LINK_MODAL", modalLink: modalLink })
export const closeCopyLinkModal = () => ({ type: "CLOSE_COPY_LINK_MODAL" })

// Image modal action creators
export const openImageModal = modalImage => ({ type: "OPEN_IMAGE_MODAL", modalImage: modalImage })
export const closeImageModal = () => ({ type: "CLOSE_IMAGE_MODAL" })
