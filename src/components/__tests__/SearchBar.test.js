import React from 'react'
import { shallow, mount } from 'enzyme'
import SearchBar from '../SearchBar'

describe('<SearchBar />', () =>{
  it('handleSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(<SearchBar handleSubmit={handleSubmit} />);
    wrapper.find('Button').simulate('submit');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
