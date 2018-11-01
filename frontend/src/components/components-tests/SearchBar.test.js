import React from 'react'
import { shallow } from 'enzyme'
import SearchBar from '../SearchBar'

describe('<SearchBar />', () =>{
  it('renders a form', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find('form').length).toEqual(1);
  });
  it('renders an input', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find('input').length).toEqual(1);
  });
  it('renders a button', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find('button').length).toEqual(1);
  });
});
