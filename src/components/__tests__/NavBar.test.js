import React from 'react'
import { mount } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../NavBar'

describe('<NavBar />', () =>{
  it('renders a nav', () => {
    const wrapper = mount(<Router><NavBar /></Router>);
    expect(wrapper.find('nav').length).toEqual(1);
  });
  it('navbar collapses', () => {
    const collapsed = true;
    const wrapper = mount(<Router><NavBar collapsed={collapsed}/></Router>);
    expect(wrapper.find('div.navbar-collapse.collapse').length).toEqual(1);
  });
  it('navbar uncollapses', () => {
    const collapsed = false;
    const wrapper = mount(<Router><NavBar collapsed={collapsed} /></Router>);
    expect(wrapper.find('div.navbar-collapse.collapse').length).toEqual(0);
  });
  it('navbar onClick', () => {
    const toggleNavBar = jest.fn();
    const wrapper = mount(<Router><NavBar toggleNavBar={toggleNavBar} /></Router>);
    wrapper.find('.navbar-toggler').simulate('click');
    expect(toggleNavBar).toHaveBeenCalledTimes(1);
  });
});
