import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

const ImageModal = (props) => (
  <Dialog
    onClose={props.closeImageModal} open={props.showImageModal}>
    <DialogContent style={{ padding: 0 }}>
      <img src={props.modalImage} alt='' />
    </DialogContent>
  </Dialog>
);


export default ImageModal
