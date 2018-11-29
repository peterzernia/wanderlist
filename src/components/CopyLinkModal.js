import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'

const CopyLinkModal = (props) => (
  <Dialog onClose={props.closeCopyLinkModal} open={props.showCopyLinkModal}>
    <DialogContent>
      <TextField className="user-auth" type='text' name="link" defaultValue={`${process.env.REACT_APP_API_URL}/p/${props.modalLink}/`} />
      <DialogActions>
        <Button onClick={() => props.closeCopyLinkModal()} variant='contained' color="primary">
          Close
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
);


export default CopyLinkModal
