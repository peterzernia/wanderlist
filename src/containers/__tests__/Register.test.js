import React from 'react'
import { shallow } from 'enzyme'
import { Register } from '../Register'
import RegistrationForm from '../../components/RegistrationForm'
import { Redirect } from 'react-router-dom'

describe('<Register />', () =>{
  let wrapper;
  const removeError = jest.fn();
  const authRegister = jest.fn();
  const e = {
    preventDefault: jest.fn(),
    target: {
      country: { value: 1 },
      username: { value: 'TestUser' },
      email: { value: 'test@test.com' },
      password1: { value: 'test' },
      password2: { value: 'test' }
    },
  };
  const toggleFavorite = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Register removeError={removeError} authRegister={authRegister} />
    )
  });

  it('componentWillUnmount calls removeError', () => {
    wrapper.instance().componentWillUnmount();
    expect(removeError).toHaveBeenCalledTimes(1);
  });
  it('handleSubmit calls removeError', () => {
    wrapper.instance().handleSubmit(e);
    expect(authRegister).toHaveBeenCalledTimes(1);
  });
  it('displays RegistrationForm', () => {
    expect(wrapper.find(RegistrationForm).length).toEqual(1);
    wrapper.setProps({ authenticated: true })
    expect(wrapper.find(RegistrationForm).length).toEqual(0);
    expect(wrapper.find(Redirect).length).toEqual(1);
  });
});
