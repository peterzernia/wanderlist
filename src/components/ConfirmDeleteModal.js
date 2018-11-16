import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const ConfirmDeleteModal = (props) => (
  <Dialog onClose={props.closeConfirmDeleteModal} open={props.showConfirmDeleteModal}>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this Trip Report?
      </DialogContentText>
      <DialogActions>
      <Button onClick={() => {props.closeConfirmDeleteModal(); props.deleteTripReport(props.modalPost);}} color="secondary" variant="contained">
        Delete
      </Button>
      <Button onClick={() => props.closeConfirmDeleteModal()} color="secondary">
        Cancel
      </Button>
    </DialogActions>
    </DialogContent>
  </Dialog>
);

export default ConfirmDeleteModal
