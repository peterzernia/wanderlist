import React from 'react'
import { mount } from 'enzyme'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Filter from '../Filter'

describe('<Filter />', () => {
  it('displays menu on click', () => {
    const props = {
      handleSubmit: jest.fn(),
      handleNewestClick: jest.fn(),
      handleTopClick: jest.fn(),
    }
    const wrapper = mount(<Filter {...props} />)
    // Clicking iconbutton opens menu
    wrapper.find(IconButton).simulate('click')
    expect(wrapper.find(Menu).length).toEqual(1)
    expect(wrapper.find(MenuItem).length).toEqual(3)
  })
})
