import React from 'react'
import { shallow } from 'enzyme'
import Button from '@material-ui/core/Button'
import NavBar from '../NavBar'

describe('<NavBar />', () => {
  it('renders login/logout links conditionally', () => {
    const wrapper = shallow(<NavBar authenticated={false} />)
    expect(wrapper.find(Button).at(4).props().to).toBe('/login')
    wrapper.setProps({ authenticated: true })
    expect(wrapper.find(Button).at(4).props().to).toBe('/logout')
  })
})
