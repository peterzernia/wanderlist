import React from 'react'
import { func, bool, string } from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'

// Form with the link of the Trip Report, so that users can easily copy the link.
const CopyLinkModal = ({ closeCopyLinkModal, showCopyLinkModal, modalLink }) => (
  <Dialog onClose={closeCopyLinkModal} open={showCopyLinkModal}>
    <DialogContent>
      <TextField className="user-auth" type="text" name="link" defaultValue={`${process.env.REACT_APP_API_URL}/p/${modalLink}/`} />
      <DialogActions>
        <Button onClick={() => closeCopyLinkModal()} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
)


export default CopyLinkModal

CopyLinkModal.propTypes = {
  closeCopyLinkModal: func.isRequired,
  showCopyLinkModal: bool.isRequired,
  modalLink: string.isRequired,
}
