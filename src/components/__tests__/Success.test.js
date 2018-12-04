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
});
