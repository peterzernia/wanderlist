import React from 'react'
import { shallow } from 'enzyme'
import Success from '../Success'
import IconButton from '@material-ui/core/IconButton'

describe('<Success />', () =>{
  it('removes success', () => {
    const removeError = jest.fn();
    const wrapper = shallow(<Success removeError={removeError} />);
    wrapper.find(IconButton).simulate('click');
    expect(removeError).toHaveBeenCalledTimes(1);
  });
  it('display success conditionally', () => {
    const wrapper = shallow(<Success />);
    expect(wrapper.find('p').length).toEqual(0);
    wrapper.setProps({ success: 'test' })
    expect(wrapper.find('p').length).toEqual(1);
  });
});
