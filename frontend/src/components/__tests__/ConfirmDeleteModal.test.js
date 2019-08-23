import React from 'react'
import { shallow } from 'enzyme'
import Button from '@material-ui/core/Button'
import ConfirmDeleteModal from '../ConfirmDeleteModal'

describe('<ConfirmDeleteModal />', () => {
  it('closes modal & deletes trip report', () => {
    const closeConfirmDeleteModal = jest.fn()
    const deleteTripReport = jest.fn()
    const wrapper = shallow(
      <ConfirmDeleteModal
        closeConfirmDeleteModal={closeConfirmDeleteModal}
        deleteTripReport={deleteTripReport}
        showConfirmDeleteModal
      />,
    )
    wrapper.find(Button).at(0).simulate('click')
    expect(closeConfirmDeleteModal).toHaveBeenCalledTimes(1)
    expect(deleteTripReport).toHaveBeenCalledTimes(1)
    wrapper.find(Button).at(1).simulate('click')
    expect(closeConfirmDeleteModal).toHaveBeenCalledTimes(2)
    expect(deleteTripReport).toHaveBeenCalledTimes(1)
  })
})
