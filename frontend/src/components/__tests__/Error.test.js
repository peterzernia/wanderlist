import React from 'react'
import { shallow } from 'enzyme'
import Error from '../Error'
import IconButton from '@material-ui/core/IconButton'

describe('<Error />', () =>{
  it('removes Error and displays proper error', () => {
    const removeError = jest.fn();
    let error = { message: "Network Error" };
    let wrapper = shallow(<Error removeError={removeError} error={error} />);
    wrapper.find(IconButton).simulate('click');
    expect(removeError).toHaveBeenCalledTimes(1);
    expect(wrapper.find('p').length).toEqual(0);
    expect(wrapper.text()).toEqual('Network Error')
  });
});
