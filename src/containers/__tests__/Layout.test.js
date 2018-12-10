import React from 'react'
import { shallow } from 'enzyme'
import { Layout } from '../Layout'
import { DotLoader } from 'react-spinners'
import Error from '../../components/error'
import Success from '../../components/Success'
import store from "../../store/index"

describe('<Layout />', () =>{
  let wrapper;
  const authLogout = jest.fn();
  const history = { push: jest.fn() }

  beforeEach(() => {
    wrapper = shallow(
      <Layout
        error={null} fetching={false} success={null} authLogout={authLogout}
        history={history}
      />
    )
  });

  it('displays loader', () => {
    expect(wrapper.find(DotLoader).length).toEqual(0);
    wrapper.setProps({ fetching: true });
    expect(wrapper.find(DotLoader).length).toEqual(1);
  });
  it('displays error', () => {
    expect(wrapper.find(Error).length).toEqual(0);
    wrapper.setProps({ error: { message: "Network Error" } });
    expect(wrapper.find('Errors').length).toEqual(1);
  });
  it('displays success', () => {
    expect(wrapper.find(Success).length).toEqual(0);
    wrapper.setProps({ success: 'success' });
    expect(wrapper.find(Success).length).toEqual(1);
  });
  it('calls fetchUser', () => {
    const fetchUser = jest.fn();
    expect(fetchUser).toHaveBeenCalledTimes(0);
    wrapper = shallow(<Layout fetchUser={fetchUser} authenticated={true} />)
    expect(fetchUser).toHaveBeenCalledTimes(1);
  });
  it('handleClick calls authLogout', () => {
    wrapper.instance().handleClick()
    expect(authLogout).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledTimes(1);
  });
});
