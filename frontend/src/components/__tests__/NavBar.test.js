import React from 'react'
import { shallow } from 'enzyme'
import NavBar from '../NavBar'

describe('<NavBar />', () =>{
  it('renders a nav', () => {
    const location = { pathname: '/search' }
    const wrapper = shallow(<NavBar {...location}/>);
    expect(wrapper.find('nav').length).toEqual(1);
  });
  it('active classNames', () => {
    const location = { pathname: '/search' }
    const wrapper = shallow(<NavBar {...location}/>);
    expect(wrapper.find('btn-navbar-brand-active').length).toEqual(1);
  });
  it('navbar onClick toggles collapse', () => {
    const location = { pathname: '/search' }
    const wrapper = shallow(<NavBar {...location}/>);
    expect(wrapper.find('div.navbar-collapse.collapse').length).toEqual(1);
    wrapper.find('.navbar-toggler').prop('onClick')();
    expect(wrapper.find('div.navbar-collapse.collapse').length).toEqual(0);
  });
});
