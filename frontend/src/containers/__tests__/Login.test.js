import React from 'react'
import { shallow } from 'enzyme'
import { Redirect } from 'react-router-dom'
import { Login } from '../Login'
import LoginForm from '../../components/LoginForm'

describe('<Login />', () => {
  let wrapper

  const props = {
    authLogin: jest.fn(),
    removeError: jest.fn(),
    authenticated: false,
    authenticating: false,
    location: {},
  }

  beforeEach(() => {
    wrapper = shallow(<Login {...props} />)
  })

  it('displays loginform', () => {
    expect(wrapper.find(LoginForm).length).toEqual(1)
    wrapper.setProps({ authenticated: true })
    expect(wrapper.find(LoginForm).length).toEqual(0)
    expect(wrapper.find(Redirect).length).toEqual(1)
  })
})
