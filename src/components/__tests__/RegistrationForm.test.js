import React from 'react'
import { shallow, mount } from 'enzyme'
import RegistrationForm from '../RegistrationForm'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { DotLoader } from 'react-spinners'

describe('<RegistrationForm />', () =>{
  it('handles submit', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<RegistrationForm handleSubmit={handleSubmit} />);
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
  it('renders MenuItems correctly', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<RegistrationForm handleSubmit={handleSubmit} />);
    expect(wrapper.find(MenuItem).length).toEqual(250)
  });
  it('renders dotloader while authenticating', () => {
    const wrapper = shallow(<RegistrationForm authenticating={true} />);
    expect(wrapper.find(DotLoader).length).toEqual(1);
  });
  // it('handles change', () => {
  //   const wrapper = shallow(<RegistrationForm />);
  //   const spy = jest.spyOn(wrapper.instance(), 'handleChange');
  //   wrapper.find(Select).props().onChange({ target: { value: 20 } })
  //   expect(spy).toHaveBeenCalledTimes(1);
  // });
});
