import React from 'react'
import { shallow } from 'enzyme'
import NavBar from '../NavBar'

describe('<NavBar />', () =>{
  it('renders a nav', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.find('nav').length).toEqual(1);
  });
  it('renders initial collapsed state', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.find('div.navbar-collapse.collapse').length).toEqual(1);
  });
  it('renders uncollapsed state onClick', () => {
    const wrapper = shallow(<NavBar />);
    wrapper.find('.navbar-toggler').prop('onClick')();
    expect(wrapper.find('div.navbar-collapse.collapse').length).toEqual(0);
  });
});
