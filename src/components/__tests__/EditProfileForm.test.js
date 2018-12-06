import React from 'react'
import { shallow, mount } from 'enzyme'
import EditProfileForm from '../EditProfileForm'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'

describe('<EditProfileForm />', () =>{
  it('handles submit', () => {
    const user = { home: { id: 1 } }
    const handleSubmit = jest.fn();
    const wrapper = shallow(<EditProfileForm handleSubmit={handleSubmit} user={user}/>);
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
  it('renders MenuItems correctly', () => {
    const user = { home: { id: 1 } }
    const handleSubmit = jest.fn();
    const wrapper = shallow(<EditProfileForm handleSubmit={handleSubmit} user={user} />);
    expect(wrapper.find(MenuItem).length).toEqual(250)
  });
  it('handles submit', () => {
    const user = { home: { id: 1 } }
    const closeEditProfileModal = jest.fn();
    const wrapper = shallow(<EditProfileForm closeEditProfileModal={closeEditProfileModal} user={user} />);
    wrapper.find(Button).at(1).simulate('click');
    expect(closeEditProfileModal).toHaveBeenCalledTimes(1);
  });
});
