import React from 'react'
import { shallow } from 'enzyme'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import EditProfileForm from '../EditProfileForm'

describe('<EditProfileForm />', () => {
  let wrapper
  let props

  beforeEach(() => {
    props = {
      user: { home: { id: 1 } },
      handleSubmit: jest.fn(),
      closeEditProfileModal: jest.fn(),
    }

    wrapper = shallow(<EditProfileForm {...props} />)
  })

  it('handles submit', () => {
    wrapper.find('form').simulate('submit')
    expect(props.handleSubmit).toHaveBeenCalledTimes(1)
  })
  it('renders MenuItems correctly', () => {
    expect(wrapper.find(MenuItem).length).toEqual(250)
  })
  it('handles submit', () => {
    wrapper.find(Button).at(1).simulate('click')
    expect(props.closeEditProfileModal).toHaveBeenCalledTimes(1)
  })
})
