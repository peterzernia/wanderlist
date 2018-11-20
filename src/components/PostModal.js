import React from 'react'
import ReactModal from 'react-modal'
import PostTripReportForm from './PostTripReportForm'
import UpdateTripReportForm from './UpdateTripReportForm'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'

ReactModal.setAppElement('body');

/*
this.props.updatePostModal is updated depending on which action opens up the
Post Modal. If the action is "OPEN_UPDATE_POST_MODAL" it flips to true, and a
trip report is passed in that can be updated by the user. If the action is
"OPEN_POST_MODAL", it remains false and no trip report is passed in, and a new
one is POSTed to the Django REST API.
*/
const PostModal = (props) => (
  <ReactModal isOpen={props.showPostModal}>
    <IconButton style={{ float: 'right' }} onClick={props.closePostModal}>
      <Close />
    </IconButton>
    <div style={{ width: 48, height: 48, float: 'left' }}/>
    {
      props.updatePostModal
      ? <UpdateTripReportForm {...props} modalPost={props.modalPost} handleSubmit={props.handleUpdateSubmit} />
      : <PostTripReportForm {...props} handleSubmit={props.handlePostSubmit} />
    }
  </ReactModal>
);

export default PostModal;
