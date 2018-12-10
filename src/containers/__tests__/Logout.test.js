import React from 'react'
import { shallow } from 'enzyme'
import { Logout } from '../Logout'

describe('<Logout />', () =>{
  let wrapper;
  const authLogout = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Logout authLogout={authLogout} />
    )
  });

  it('componentWillMount calls authLogout', () => {
    expect(authLogout).toHaveBeenCalledTimes(1);
  });
});
