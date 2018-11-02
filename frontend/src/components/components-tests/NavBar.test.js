import React from 'react'
import { shallow } from 'enzyme'
import NavBar from '../NavBar'

describe('<NavBar />', () =>{
  it('renders a nav', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.find('nav').length).toEqual(1);
  });
  it('navbar initially collapsed', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.find('div.navbar-collapse.collapse').length).toEqual(1);
  });
  it('navbar uncollapsed onClick', () => {
    const wrapper = shallow(<NavBar />);
    wrapper.find('.navbar-toggler').prop('onClick')();
    expect(wrapper.find('div.navbar-collapse.collapse').length).toEqual(0);
  });
});
