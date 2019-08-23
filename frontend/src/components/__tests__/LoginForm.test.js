import React from 'react'
import { shallow } from 'enzyme'
import Card from '@material-ui/core/Card'
import LoginForm from '../LoginForm'

describe('<LoginForm />', () => {
  it('renders component', () => {
    const wrapper = shallow(<LoginForm showLoginForm handleSubmit={jest.fn()} />)
    expect(wrapper.find(Card).length).toEqual(1)
  })
  it('handles submit', () => {
    const handleSubmit = jest.fn()
    const wrapper = shallow(<LoginForm handleSubmit={handleSubmit} />)
    wrapper.find('form').simulate('submit')
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
