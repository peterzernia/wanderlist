import React from 'react'
import { shallow } from 'enzyme'
import Error from '../Error'
import IconButton from '@material-ui/core/IconButton'

describe('<Error />', () =>{
  it('removes Error and displays proper error', () => {
    const removeError = jest.fn();
    const error = { message: "Network Error" };
    const wrapper = shallow(<Error removeError={removeError} error={error} />);
    wrapper.find(IconButton).simulate('click');
    expect(removeError).toHaveBeenCalledTimes(1);
    expect(wrapper.find('p').length).toEqual(0);
    expect(wrapper.text()).toEqual('<WithStyles(IconButton) />Network Error')
    wrapper.setProps({ error: { response: { data: { password: ["This field may not be blank."] }}}})
    expect(wrapper.find('p').length).toEqual(1);
  });
});
