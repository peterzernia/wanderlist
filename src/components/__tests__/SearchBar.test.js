import React from 'react'
import { shallow, mount } from 'enzyme'
import SearchBar from '../SearchBar'

describe('<SearchBar />', () =>{
  it('renders a form', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('input').length).toEqual(1);
    expect(wrapper.find('button').length).toEqual(1);
  });
  it('handleSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(<SearchBar handleSubmit={handleSubmit} />);
    wrapper.find('.btn-primary').simulate('submit');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
