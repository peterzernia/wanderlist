import React from 'react'
import { shallow } from 'enzyme'
import { Home } from '../Home'
import { tripReport } from '../../testVariables'
import TripReportTruncated from '../../components/TripReportTruncated'

describe('<Home />', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      toggleFavorite: jest.fn(),
      tripReport: [tripReport],
      showCountryModal: false,
      modalCountry: {},
      authenticated: true,
      showNotAuthModal: false,
      showCopyLinkModal: false,
      openCountryModal: jest.fn(),
      closeCountryModal: jest.fn(),
      openCopyLinkModal: jest.fn(),
      closeCopyLinkModal: jest.fn(),
      openNotAuthModal: jest.fn(),
      closeNotAuthModal: jest.fn(),
    }

    wrapper = shallow(<Home {...props} />)
  })

  it('displays featured tripReport', () => {
    expect(wrapper.find(TripReportTruncated).length).toEqual(1)
  })
})
