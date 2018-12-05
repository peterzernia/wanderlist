import React from 'react'
import { shallow, mount } from 'enzyme'
import Filter from '../Filter'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

describe('<Filter />', () =>{
  it('displays menu on click', () => {
    const wrapper = mount(<Filter/>);
    // Clicking iconbutton opens menu
    wrapper.find(IconButton).simulate('click');
    expect('anchorEl' in wrapper.state()).toEqual(true)
    expect(wrapper.find(Menu).length).toEqual(1);
    expect(wrapper.find(MenuItem).length).toEqual(3);
  });
  it('handles filter click', () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(
      <Filter handleSubmit={handleSubmit} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleClose');
    wrapper.find(IconButton).simulate('click');
    expect(wrapper.find(Button).text()).toEqual('Filter');
    wrapper.find(Button).simulate('submit');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('handles top click', () => {
    const handleTopClick = jest.fn();
    const handleNewestClick = jest.fn();
    const wrapper = mount(
      <Filter handleTopClick={handleTopClick} handleNewestClick={handleNewestClick} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleClose');
    wrapper.find(IconButton).simulate('click');
    wrapper.find(MenuItem).at(1).simulate('click');
    expect(wrapper.find(MenuItem).at(1).text()).toEqual('Top');
    expect(handleTopClick).toHaveBeenCalledTimes(1);
    expect(handleNewestClick).toHaveBeenCalledTimes(0);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('handles newest click', () => {
    const handleTopClick = jest.fn();
    const handleNewestClick = jest.fn();
    const wrapper = mount(
      <Filter handleTopClick={handleTopClick} handleNewestClick={handleNewestClick} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleClose');
    wrapper.find(IconButton).simulate('click');
    wrapper.find(MenuItem).at(2).simulate('click');
    expect(wrapper.find(MenuItem).at(2).text()).toEqual('Newest');
    expect(handleTopClick).toHaveBeenCalledTimes(0);
    expect(handleNewestClick).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
