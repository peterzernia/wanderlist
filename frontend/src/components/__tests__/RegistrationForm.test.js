import React from 'react'
import { shallow } from 'enzyme'
import MenuItem from '@material-ui/core/MenuItem'
import { DotLoader } from 'react-spinners'
import RegistrationForm from '../RegistrationForm'

describe('<RegistrationForm />', () => {
  it('handles submit', () => {
    const handleSubmit = jest.fn()
    const wrapper = shallow(<RegistrationForm handleSubmit={handleSubmit} authenticating={false} />)
    wrapper.find('form').simulate('submit')
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('renders MenuItems correctly', () => {
    const handleSubmit = jest.fn()
    const wrapper = shallow(<RegistrationForm handleSubmit={handleSubmit} authenticating={false} />)
    expect(wrapper.find(MenuItem).length).toEqual(250)
  })

  it('renders dotloader while authenticating', () => {
    const wrapper = shallow(<RegistrationForm handleSubmit={jest.fn()} authenticating />)
    expect(wrapper.find(DotLoader).length).toEqual(1)
  })
})
