import React from 'react'
import { mount } from 'enzyme'
import Button from '@material-ui/core/Button'
import SearchBar from '../SearchBar'

describe('<SearchBar />', () => {
  it('handleSubmit', () => {
    const handleSubmit = jest.fn()
    const wrapper = mount(<SearchBar handleSubmit={handleSubmit} />)
    wrapper.find(Button).simulate('submit')
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
