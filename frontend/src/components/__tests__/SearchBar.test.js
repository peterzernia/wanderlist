import React from 'react'
import { mount } from 'enzyme'
import SearchBar from '../SearchBar'
import Button from '@material-ui/core/Button'

describe('<SearchBar />', () =>{
  it('handleSubmit', () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(<SearchBar handleSubmit={handleSubmit} />);
    wrapper.find(Button).simulate('submit');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('gives correct autocomplete suggestions', () => {
    const wrapper = mount(<SearchBar />);
    expect(wrapper.state().suggestions).toEqual([]);
    wrapper.setState({ value: 'd' });
    wrapper.find('input').simulate('focus');
    expect(wrapper.state().suggestions).toEqual([
      {"name": "Denmark", "pk": 63},
      {"name": "Djibouti", "pk": 64},
      {"name": "Dominica", "pk": 65},
      {"name": "Dominican Republic", "pk": 66}]);
    wrapper.setState({ value: 'x' });
    wrapper.find('input').simulate('focus');
    expect(wrapper.state().suggestions).toEqual([]);
  });
});
