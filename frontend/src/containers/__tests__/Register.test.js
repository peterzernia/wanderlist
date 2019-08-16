import React from 'react'
import { shallow } from 'enzyme'
import { Register } from '../Register'
import RegistrationForm from '../../components/RegistrationForm'
import { Redirect } from 'react-router-dom'

describe('<Register />', () =>{
  let wrapper;
  const removeError = jest.fn();
  const authRegister = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Register removeError={removeError} authRegister={authRegister} />
    )
  });

  it('displays RegistrationForm', () => {
    expect(wrapper.find(RegistrationForm).length).toEqual(1);
    wrapper.setProps({ authenticated: true })
    expect(wrapper.find(RegistrationForm).length).toEqual(0);
    expect(wrapper.find(Redirect).length).toEqual(1);
  });
});
