import React from 'react'
import { shallow } from 'enzyme'
import { Login } from '../Login'
import { DotLoader } from 'react-spinners'
import LoginForm from '../../components/LoginForm'
import { Redirect } from 'react-router-dom'

describe('<Login />', () =>{
  let wrapper;
  const e = { preventDefault: jest.fn(), target: { username: 'TestUser', password: 'test' } };
  const authLogin = jest.fn();
  const removeError = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Login
        authLogin={authLogin} removeError={removeError} authenticated={false}
      />
    )
  });

  it('handleClick calls authLogin', () => {
    wrapper.instance().handleSubmit(e)
    expect(authLogin).toHaveBeenCalledTimes(1);
  });
  it('displays loginform', () => {
    expect(wrapper.find(LoginForm).length).toEqual(1);
    wrapper.setProps({ authenticated: true })
    expect(wrapper.find(LoginForm).length).toEqual(0);
    expect(wrapper.find(Redirect).length).toEqual(1);
  });
  it('componentWillUnmount calls removeError', () => {
    wrapper.instance().componentWillUnmount()
    expect(removeError).toHaveBeenCalledTimes(1);
  });
});
