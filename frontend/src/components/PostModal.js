import React from 'react'
import { bool, func, object } from 'prop-types'
import ReactModal from 'react-modal'
import TripReportForm from './TripReportForm'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'

ReactModal.setAppElement('body');

/*
updatePostModal is updated depending on which action opens up the
Post Modal. If the action is "OPEN_UPDATE_POST_MODAL" it flips to true, and a
trip report is passed in that can be updated by the user. If the action is
"OPEN_POST_MODAL", it remains false and no trip report is passed in, and a new
one is POSTed to the Django REST API.
*/
const PostModal = ({
  updatePostModal, 
  showPostModal, 
  closePostModal, 
  modalPost, 
  handleUpdateSubmit, 
  handlePostSubmit, 
  ...rest}) => (
  <ReactModal isOpen={showPostModal}>
    <IconButton style={{ float: 'right' }} onClick={closePostModal}>
      <Close />
    </IconButton>
    <div style={{ width: 48, height: 48, float: 'left' }}/>
    <TripReportForm {...rest} modalPost={modalPost} handleSubmit={updatePostModal ? handleUpdateSubmit : handlePostSubmit} />
  </ReactModal>
);

export default PostModal;

PostModal.propTypes = {
  updatePostModal: bool,
  showPostModal: bool.isRequired,
  closePostModal: func.isRequired,
  modalPost: object,
  handleUpdateSubmit: func,
  handlePostSubmit: func,
}