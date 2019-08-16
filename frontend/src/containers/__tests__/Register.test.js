import React from 'react'
import { shallow } from 'enzyme'
import { Register } from '../Register'
import RegistrationForm from '../../components/RegistrationForm'
import { Redirect } from 'react-router-dom'

describe('<Register />', () =>{
  let wrapper;
  const props = {
    removeError: jest.fn(),
    authRegister: jest.fn(),
    authenticated: false,
    authenticating: false,
  }

  beforeEach(() => {
    wrapper = shallow(
      <Register {...props} />
    )
  });

  it('displays RegistrationForm', () => {
    expect(wrapper.find(RegistrationForm).length).toEqual(1);
    wrapper.setProps({ authenticated: true })
    expect(wrapper.find(RegistrationForm).length).toEqual(0);
    expect(wrapper.find(Redirect).length).toEqual(1);
  });
});
