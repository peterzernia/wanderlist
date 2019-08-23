import React from 'react'
import { shallow } from 'enzyme'
import Button from '@material-ui/core/Button'
import CopyLinkModal from '../CopyLinkModal'

describe('<CopyLinkModal />', () => {
  it('closes modal', () => {
    const closeCopyLinkModal = jest.fn()
    const wrapper = shallow(
      <CopyLinkModal closeCopyLinkModal={closeCopyLinkModal} showCopyLinkModal />,
    )
    wrapper.find(Button).simulate('click')
    expect(closeCopyLinkModal).toHaveBeenCalledTimes(1)
  })
})
