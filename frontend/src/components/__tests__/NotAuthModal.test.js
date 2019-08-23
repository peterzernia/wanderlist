import React from 'react'
import { shallow } from 'enzyme'
import Button from '@material-ui/core/Button'
import NotAuthModal from '../NotAuthModal'

describe('<NotAuthModal />', () => {
  it('closes modal', () => {
    const closeNotAuthModal = jest.fn()
    const wrapper = shallow(<NotAuthModal closeNotAuthModal={closeNotAuthModal} showNotAuthModal />)
    wrapper.find(Button).simulate('click')
    expect(closeNotAuthModal).toHaveBeenCalledTimes(1)
  })
})
