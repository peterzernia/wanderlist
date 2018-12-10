import React from 'react'
import { shallow } from 'enzyme'
import { Logout } from '../Logout'
import { DotLoader } from 'react-spinners'

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
