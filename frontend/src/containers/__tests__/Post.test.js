import React from 'react'
import { shallow } from 'enzyme'
import { DotLoader } from 'react-spinners'
import { Post } from '../Post'
import CountryModal from '../../components/CountryModal'
import TripReportTruncated from '../../components/TripReportTruncated'
import { tripReport } from '../../testVariables'

describe('<Post />', () => {
  let wrapper

  const props = {
    fetchSlugTripReports: jest.fn(),
    removeError: jest.fn(),
    toggleFavorite: jest.fn(),
    fetching: true,
    match: { params: { slug: 'AO3TH39223S' } },
    authenticated: true,
    tripReports: [],
    showCountryModal: false,
    modalCountry: {},
    showNotAuthModal: false,
    showCopyLinkModal: false,
    openCountryModal: jest.fn(),
    closeCountryModal: jest.fn(),
    openNotAuthModal: jest.fn(),
    closeNotAuthModal: jest.fn(),
    openCopyLinkModal: jest.fn(),
    closeCopyLinkModal: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(
      <Post {...props} />,
    )
  })


  it('displays loader', () => {
    expect(wrapper.find(DotLoader).length).toEqual(1)
    wrapper.setProps({ fetching: false })
    expect(wrapper.find(DotLoader).length).toEqual(0)
  })

  it('displays TripReport', () => {
    expect(wrapper.find(TripReportTruncated).length).toEqual(0)
    wrapper.setProps({ fetching: false, tripReports: [tripReport, tripReport] })
    // One <TripReportTruncated /> for every trip report in the array.
    expect(wrapper.find(TripReportTruncated).length).toEqual(2)
  })

  it('displays CountryModal', () => {
    expect(wrapper.find(CountryModal).length).toEqual(0)
    wrapper.setProps({ fetching: false })
    expect(wrapper.find(CountryModal).length).toEqual(1)
  })
})
