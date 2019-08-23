import modal from '../modal'
import { country, user, tripReport } from '../../testVariables'

const defaultState = {
  showCountryModal: false,
  showEditProfileModal: false,
  showPostModal: false,
  updatePostModal: false,
  showConfirmDeleteModal: false,
  showTripReportModal: false,
  showNotAuthModal: false,
  showCopyLinkModal: false,
  modalCountry: {},
  modalProfile: {},
  modalPost: {},
  modalLink: null,
}

describe('modal Reducer', () => {
  it('has a default state', () => {
    expect(modal(undefined, { type: 'unexpected' })).toEqual({
      ...defaultState,
    })
  })
  it('can handle OPEN_COUNTRY_MODAL', () => {
    expect(modal(undefined, {
      type: 'OPEN_COUNTRY_MODAL',
      modalCountry: country,
    })).toEqual({
      ...defaultState,
      showCountryModal: true,
      modalCountry: country,
    })
  })
  it('can handle CLOSE_COUNTRY_MODAL', () => {
    expect(modal(undefined, { type: 'CLOSE_COUNTRY_MODAL' })).toEqual({
      ...defaultState,
      showCountryModal: false,
    })
  })
  it('can handle OPEN_EDIT_PROFILE_MODAL', () => {
    expect(modal(undefined, {
      type: 'OPEN_EDIT_PROFILE_MODAL',
      modalProfile: user,
    })).toEqual({
      ...defaultState,
      showEditProfileModal: true,
      modalProfile: user,
    })
  })
  it('can handle CLOSE_EDIT_PROFILE_MODAL', () => {
    expect(modal(undefined, { type: 'CLOSE_EDIT_PROFILE_MODAL' })).toEqual({
      ...defaultState,
      showEditProfileModal: false,
    })
  })
  it('can handle OPEN_POST_MODAL', () => {
    expect(modal(undefined, {
      type: 'OPEN_POST_MODAL',
    })).toEqual({
      ...defaultState,
      showPostModal: true,
    })
  })
  it('can handle OPEN_UPDATE_POST_MODAL', () => {
    expect(modal(undefined, {
      type: 'OPEN_UPDATE_POST_MODAL',
      modalPost: tripReport,
    })).toEqual({
      ...defaultState,
      showPostModal: true,
      updatePostModal: true,
      modalPost: tripReport,
    })
  })
  it('can handle CLOSE_POST_MODAL', () => {
    expect(modal(undefined, { type: 'CLOSE_POST_MODAL' })).toEqual({
      ...defaultState,
      showPostModal: false,
      updatePostModal: false,
    })
  })
  it('can handle OPEN_CONFIRM_DELETE_MODAL', () => {
    expect(modal(undefined, {
      type: 'OPEN_CONFIRM_DELETE_MODAL',
      modalPost: tripReport,
    })).toEqual({
      ...defaultState,
      showConfirmDeleteModal: true,
      modalPost: tripReport,
    })
  })
  it('can handle CLOSE_CONFIRM_DELETE_MODAL', () => {
    expect(modal(undefined, { type: 'CLOSE_CONFIRM_DELETE_MODAL' })).toEqual({
      ...defaultState,
      showConfirmDeleteModal: false,
    })
  })
  it('can handle OPEN_TRIP_REPORT_MODAL', () => {
    expect(modal(undefined, {
      type: 'OPEN_TRIP_REPORT_MODAL',
      modalPost: tripReport,
    })).toEqual({
      ...defaultState,
      showTripReportModal: true,
      modalPost: tripReport,
    })
  })
  it('can handle CLOSE_TRIP_REPORT_MODAL', () => {
    expect(modal(undefined, {
      type: 'CLOSE_TRIP_REPORT_MODAL',
    })).toEqual({
      ...defaultState,
      showTripReportModal: false,
    })
  })
  it('can handle OPEN_NOT_AUTH_MODAL', () => {
    expect(modal(undefined, {
      type: 'OPEN_NOT_AUTH_MODAL',
    })).toEqual({
      ...defaultState,
      showNotAuthModal: true,
    })
  })
  it('can handle CLOSE_NOT_AUTH_MODAL', () => {
    expect(modal(undefined, {
      type: 'CLOSE_NOT_AUTH_MODAL',
    })).toEqual({
      ...defaultState,
      showNotAuthModal: false,
    })
  })
  it('can handle OPEN_COPY_LINK_MODAL', () => {
    expect(modal(undefined, {
      type: 'OPEN_COPY_LINK_MODAL',
      modalLink: 'http://test.com',
    })).toEqual({
      ...defaultState,
      showCopyLinkModal: true,
      modalLink: 'http://test.com',
    })
  })
  it('can handle CLOSE_COPY_LINK_MODAL', () => {
    expect(modal(undefined, {
      type: 'CLOSE_COPY_LINK_MODAL',
    })).toEqual({
      ...defaultState,
      showCopyLinkModal: false,
    })
  })
  it('can handle TOGGLE_FAVORITE_FULFILLED', () => {
    expect(modal(undefined, {
      type: 'TOGGLE_FAVORITE_FULFILLED',
      response: tripReport,
    })).toEqual({
      ...defaultState,
      modalPost: tripReport,
    })
  })
})
