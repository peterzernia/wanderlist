import React from 'react'
import { shallow } from 'enzyme'
import ReactModal from 'react-modal'
import IconButton from '@material-ui/core/IconButton'
import TripReportModal from '../TripReportModal'

describe('<TripReportModal />', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      showTripReportModal: false,
      closeTripReportModal: jest.fn(),
      modalPost: {},
      handleClick: jest.fn(),
      content: '',
      countries: [],
      openCountryModal: jest.fn(),
      title: '',
      author: {},
      favoriters: [],
      id: 1,
      openCopyLinkModal: jest.fn(),
      closeCopyLinkModal: jest.fn(),
      authenticated: true,
      slug: '',
      modalCountry: {},
      showCountryModal: false,
      closeCountryModal: jest.fn(),
    }
    wrapper = shallow(<TripReportModal {...props} />)
  })
  it('renders modal', () => {
    expect(wrapper.find(ReactModal).length).toEqual(1)
  })

  it('closes modal', () => {
    props = { ...props, showTripReportModal: true }
    wrapper = shallow(<TripReportModal {...props} />)
    wrapper.find(IconButton).simulate('click')
    expect(props.closeTripReportModal).toHaveBeenCalledTimes(1)
  })
})
