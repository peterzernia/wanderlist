import React from 'react'
import { shallow } from 'enzyme'
import { DotLoader } from 'react-spinners'
import { Feed } from '../Feed'
import { tripReport } from '../../testVariables'
import TripReportTruncated from '../../components/TripReportTruncated'

describe('<Feed />', () => {
  let wrapper

  const props = {
    removeError: jest.fn(),
    toggleFavorite: jest.fn(),
    fetchTripReports: jest.fn(),
    fetching: true,
    fetchingNext: false,
  }

  beforeEach(() => {
    wrapper = shallow(
      <Feed {...props} />,
    )
  })

  it('displays Trip Reports', () => {
    expect(wrapper.find(TripReportTruncated).length).toEqual(0)
    wrapper.setProps({ fetching: false, tripReports: [tripReport, tripReport] })
    expect(wrapper.find(TripReportTruncated).length).toEqual(2)
  })

  it('displays loaders', () => {
    expect(wrapper.find(DotLoader).length).toEqual(1)
  })
})
