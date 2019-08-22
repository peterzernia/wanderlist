import React from 'react'
import { func, bool } from 'prop-types'
import EditProfileForm from './EditProfileForm'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

export default function EditProfileModal(props){
  const { closeEditProfileModal, showEditProfileModal } = props

  return (  
    <Dialog onClose={closeEditProfileModal} open={showEditProfileModal}>
      <DialogContent>
        <EditProfileForm {...props}/>
      </DialogContent>
    </Dialog>
  )
}

EditProfileForm.propTypes = {
  closeEditProfileModal: func,
  showEditProfileModal: bool,
}
