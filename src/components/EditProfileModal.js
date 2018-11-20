import React from 'react'
import EditProfileForm from './EditProfileForm'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

const EditProfileModal = (props) => (
  <Dialog onClose={props.closeEditProfileModal} open={props.showEditProfileModal}>
    <DialogContent>
      <EditProfileForm {...props}/>
    </DialogContent>
  </Dialog>
);

export default EditProfileModal;
