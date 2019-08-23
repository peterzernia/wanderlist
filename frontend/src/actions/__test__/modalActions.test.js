import * as modalActions from '../modalActions'
import { country as modalCountry, user as modalProfile, tripReport as modalPost } from '../../testVariables'

describe('Modal Action Creators', () => {
  it('should create a OPEN_COUNTRY_MODAL action', () => {
    const expectedAction = {
      type: 'OPEN_COUNTRY_MODAL',
      modalCountry,
    }
    expect(modalActions.openCountryModal(modalCountry)).toEqual(expectedAction)
  })
  it('should create a CLOSE_COUNTRY_MODAL action', () => {
    const expectedAction = { type: 'CLOSE_COUNTRY_MODAL' }
    expect(modalActions.closeCountryModal()).toEqual(expectedAction)
  })

  it('should create a OPEN_EDIT_PROFILE_MODAL action', () => {
    const expectedAction = {
      type: 'OPEN_EDIT_PROFILE_MODAL',
      modalProfile,
    }
    expect(modalActions.openEditProfileModal(modalProfile)).toEqual(expectedAction)
  })
  it('should create a CLOSE_EDIT_PROFILE_MODAL action', () => {
    const expectedAction = { type: 'CLOSE_EDIT_PROFILE_MODAL' }
    expect(modalActions.closeEditProfileModal()).toEqual(expectedAction)
  })

  it('should create a OPEN_POST_MODAL action', () => {
    const expectedAction = { type: 'OPEN_POST_MODAL' }
    expect(modalActions.openPostModal()).toEqual(expectedAction)
  })
  it('should create a OPEN_UPDATE_POST_MODAL action', () => {
    const expectedAction = {
      type: 'OPEN_UPDATE_POST_MODAL',
      modalPost,
    }
    expect(modalActions.openUpdatePostModal(modalPost)).toEqual(expectedAction)
  })
  it('should create a CLOSE_POST_MODAL action', () => {
    const expectedAction = { type: 'CLOSE_POST_MODAL' }
    expect(modalActions.closePostModal()).toEqual(expectedAction)
  })

  it('should create a OPEN_CONFIRM_DELETE_MODAL action', () => {
    const expectedAction = {
      type: 'OPEN_CONFIRM_DELETE_MODAL',
      modalPost,
    }
    expect(modalActions.openConfirmDeleteModal(modalPost)).toEqual(expectedAction)
  })
  it('should create a CLOSE_CONFIRM_DELETE_MODAL action', () => {
    const expectedAction = { type: 'CLOSE_CONFIRM_DELETE_MODAL' }
    expect(modalActions.closeConfirmDeleteModal()).toEqual(expectedAction)
  })

  it('should create a OPEN_TRIP_REPORT_MODAL action', () => {
    const expectedAction = {
      type: 'OPEN_TRIP_REPORT_MODAL',
      modalPost,
    }
    expect(modalActions.openTripReportModal(modalPost)).toEqual(expectedAction)
  })
  it('should create a CLOSE_TRIP_REPORT_MODAL action', () => {
    const expectedAction = { type: 'CLOSE_TRIP_REPORT_MODAL' }
    expect(modalActions.closeTripReportModal()).toEqual(expectedAction)
  })

  it('should create a OPEN_NOT_AUTH_MODAL action', () => {
    const expectedAction = { type: 'OPEN_NOT_AUTH_MODAL' }
    expect(modalActions.openNotAuthModal()).toEqual(expectedAction)
  })
  it('should create a CLOSE_NOT_AUTH_MODAL action', () => {
    const expectedAction = { type: 'CLOSE_NOT_AUTH_MODAL' }
    expect(modalActions.closeNotAuthModal()).toEqual(expectedAction)
  })

  it('should create a OPEN_COPY_LINK_MODAL action', () => {
    const modalLink = 'http://test.com/'
    const expectedAction = {
      type: 'OPEN_COPY_LINK_MODAL',
      modalLink,
    }
    expect(modalActions.openCopyLinkModal(modalLink)).toEqual(expectedAction)
  })
  it('should create a CLOSE_COPY_LINK_MODAL action', () => {
    const expectedAction = { type: 'CLOSE_COPY_LINK_MODAL' }
    expect(modalActions.closeCopyLinkModal()).toEqual(expectedAction)
  })
})
