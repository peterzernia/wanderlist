import React from 'react'
import { shallow, mount } from 'enzyme'
import PostTripReportForm from '../PostTripReportForm'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

describe('<PostTripReportForm />', () =>{
  it('handles submit', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<PostTripReportForm handleSubmit={handleSubmit} />);
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
  it('renders MenuItems correctly', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<PostTripReportForm handleSubmit={handleSubmit} />);
    expect(wrapper.find(MenuItem).length).toEqual(250)
  });
});
