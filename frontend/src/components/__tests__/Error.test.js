import React from 'react'
import { shallow } from 'enzyme'
import IconButton from '@material-ui/core/IconButton'
import Error from '../Error'

describe('<Error />', () => {
  it('removes Error and displays proper error', () => {
    const removeError = jest.fn()
    const error = { message: 'Network Error' }
    const wrapper = shallow(<Error removeError={removeError} error={error} />)
    wrapper.find(IconButton).simulate('click')
    expect(removeError).toHaveBeenCalledTimes(1)
    expect(wrapper.find('p').length).toEqual(0)
    expect(wrapper.text()).toEqual('Network Error')
  })
})
