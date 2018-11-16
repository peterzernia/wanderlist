import React from 'react'
import EditProfileForm from './EditProfileForm'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

const ProfileModal = (props) => (
  <Dialog onClose={props.closeProfileModal} open={props.showProfileModal}>
    <DialogContent>
      <EditProfileForm {...props}/>
    </DialogContent>
  </Dialog>
);

export default ProfileModal;
