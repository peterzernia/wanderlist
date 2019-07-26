import React from 'react'
import { func, bool, object } from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

const ConfirmDeleteModal = ({ closeConfirmDeleteModal, showConfirmDeleteModal, deleteTripReport, modalPost }) => (
  <Dialog onClose={closeConfirmDeleteModal} open={showConfirmDeleteModal}>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this Trip Report?
      </DialogContentText>
      <DialogActions>
      <Button onClick={() => {closeConfirmDeleteModal(); deleteTripReport(modalPost);}} color="primary" variant="contained">
        Delete
      </Button>
      <Button onClick={() => closeConfirmDeleteModal()} color="secondary">
        Cancel
      </Button>
    </DialogActions>
    </DialogContent>
  </Dialog>
);

export default ConfirmDeleteModal

ConfirmDeleteModal.propTypes = {
  closeConfirmDeleteModal: func,
  showConfirmDeleteModal: bool,
  deleteTripReport: func,
  modalPost: object,
}
