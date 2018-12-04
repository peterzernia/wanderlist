import React from 'react'
import { shallow } from 'enzyme'
import ForgotPasswordForm from '../ForgotPasswordForm'
import Card from '@material-ui/core/Card'

describe('<ForgotPasswordForm />', () =>{
  it('renders component', () => {
    const wrapper = shallow(<ForgotPasswordForm showForgotPasswordForm={true} />);
    expect(wrapper.find(Card).length).toEqual(1);
  });
  it('handles submit', () => {
    const handleSubmit = jest.fn();
    const wrapper = shallow(<ForgotPasswordForm handleSubmit={handleSubmit} />);
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
