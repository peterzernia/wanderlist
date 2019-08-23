import React from 'react'
import { shallow } from 'enzyme'
import Dialog from '@material-ui/core/Dialog'
import EditProfileModal from '../EditProfileModal'

describe('<EditProfileModal />', () => {
  it('closes modal', () => {
    const closeEditProfileModal = jest.fn()
    const user = { home: { id: 0 } }
    const wrapper = shallow(
      <EditProfileModal
        closeEditProfileModal={closeEditProfileModal}
        showEditProfileModal
        user={user}
      />,
    )
    wrapper.find(Dialog).prop('onClose')(closeEditProfileModal)
    expect(closeEditProfileModal).toHaveBeenCalledTimes(1)
  })
})
