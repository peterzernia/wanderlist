import React from 'react'
import { func, bool } from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import EditProfileForm from './EditProfileForm'

export default function EditProfileModal(props) {
  const {
    closeEditProfileModal,
    showEditProfileModal,
  } = props

  return (
    <Dialog onClose={closeEditProfileModal} open={showEditProfileModal}>
      <DialogContent>
        <EditProfileForm {...props} />
      </DialogContent>
    </Dialog>
  )
}

EditProfileModal.propTypes = {
  closeEditProfileModal: func.isRequired,
  showEditProfileModal: bool.isRequired,
}
