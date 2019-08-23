import React from 'react'
import { shallow } from 'enzyme'
import ReactModal from 'react-modal'
import IconButton from '@material-ui/core/IconButton'
import PostModal from '../PostModal'
import TripReportForm from '../TripReportForm'

describe('<PostModal />', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      closePostModal: jest.fn(),
      showPostModal: true,
      updatePostModal: false,
    }
    wrapper = shallow(<PostModal {...props} />)
  })

  it('closes modal', () => {
    expect(wrapper.find(ReactModal).length).toEqual(1)
    wrapper.find(IconButton).simulate('click')
    expect(props.closePostModal).toHaveBeenCalledTimes(1)
  })
  it('renders post/update forms conditionally', () => {
    expect(wrapper.find(TripReportForm).length).toEqual(1)
    wrapper.setProps({ updatePostModal: true })
    expect(wrapper.find(TripReportForm).length).toEqual(1)
  })
})
