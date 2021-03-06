import React from 'react'
import { shallow } from 'enzyme'
import Button from '@material-ui/core/Button'
import { DotLoader } from 'react-spinners'
import { Profile } from '../Profile'
import { tripReport, user } from '../../testVariables'
import TripReportThumbnail from '../../components/TripReportThumbnail'
import CountryModal from '../../components/CountryModal'
import OpenStreetMap from '../../components/OpenStreetMap'

describe('<Profile />', () => {
  let wrapper
  const props = {
    removeError: jest.fn(),
    postTripReport: jest.fn(),
    closePostModal: jest.fn(),
    updateTripReport: jest.fn(),
    putUserData: jest.fn(),
    closeEditProfileModal: jest.fn(),
    openEditProfileModal: jest.fn(),
    toggleFavorite: jest.fn(),
    modalPost: { tripReport },
    user,
    userCountries: [],
    fetchedTripReports: false,
    fetched: false,
    location: { pathname: '/profile' },
    showPostModal: false,
    authenticated: true,
    fetchingUserNext: false,
    searchedCountry: [],
    showEditProfileModal: false,
    modalProfile: {},
    showCountryModal: false,
    tripReports: [],
    updatedPostModal: false,
    showConfirmDeleteModal: false,
    showCopyLinkModal: false,
    posting: false,
    updating: false,
    openCountryModal: jest.fn(),
    closeCountryModal: jest.fn(),
    deleteTripReport: jest.fn(),
    openPostModal: jest.fn(),
    openUpdatePostModal: jest.fn(),
    openConfirmDeleteModal: jest.fn(),
    closeConfirmDeleteModal: jest.fn(),
    openTripReportModal: jest.fn(),
    closeTripReportModal: jest.fn(),
    fetchNextUserTripReports: jest.fn(),
    openCopyLinkModal: jest.fn(),
    closeCopyLinkModal: jest.fn(),
    modalCountry: {},
    updatePostModal: false,
    showTripReportModal: false,
    fetchCountry: jest.fn(),
    match: {},
  }

  beforeEach(() => {
    wrapper = shallow(
      <Profile {...props} />,
    )
  })

  it('displays Trip Report thumbnails', () => {
    expect(wrapper.find(TripReportThumbnail).length).toEqual(0)
    wrapper.setProps({ fetchedTripReports: true, tripReports: [tripReport, tripReport] })
    // One <TripReportThumbnail /> for every trip report in the array.
    expect(wrapper.find(TripReportThumbnail).length).toEqual(2)
  })

  it('displays CountryModal', () => {
    expect(wrapper.find(CountryModal).length).toEqual(0)
    wrapper.setProps({ fetched: true })
    expect(wrapper.find(CountryModal).length).toEqual(1)
  })

  it('button opens EditProfile Modal', () => {
    wrapper.find(Button).simulate('click')
    expect(props.openEditProfileModal).toHaveBeenCalledTimes(1)
  })

  it('displays OpenStreetMap', () => {
    expect(wrapper.find(OpenStreetMap).length).toEqual(0)
    wrapper.setProps({ fetched: true })
    expect(wrapper.find(OpenStreetMap).length).toEqual(1)
  })

  it('displays loaders', () => {
    expect(wrapper.find(DotLoader).length).toEqual(0)
    wrapper.setProps({ posting: true })
    expect(wrapper.find(DotLoader).length).toEqual(1)
    wrapper.setProps({ updating: true, posting: false })
    expect(wrapper.find(DotLoader).length).toEqual(1)
    wrapper.setProps({ fetchingUserNext: true, updating: false })
    expect(wrapper.find(DotLoader).length).toEqual(1)
  })
})
