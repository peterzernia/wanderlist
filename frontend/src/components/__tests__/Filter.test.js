import React from 'react'
import { mount } from 'enzyme'
import Filter from '../Filter'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'

describe('<Filter />', () =>{
  it('displays menu on click', () => {
    const wrapper = mount(<Filter/>);
    // Clicking iconbutton opens menu
    wrapper.find(IconButton).simulate('click');
    expect(wrapper.find(Menu).length).toEqual(1);
    expect(wrapper.find(MenuItem).length).toEqual(3);
  });
});
