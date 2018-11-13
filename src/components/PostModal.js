import React from 'react'
import ReactModal from 'react-modal'
import PostTripReportForm from './PostTripReportForm'
import UpdateTripReportForm from './UpdateTripReportForm'

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
    <div className="close-modal">
      <button onClick={props.closePostModal} className="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    {
      props.updatePostModal
      ? <UpdateTripReportForm modalPost={props.modalPost} handleSubmit={props.handleUpdateSubmit} />
      : <PostTripReportForm handleSubmit={props.handlePostSubmit} />
    }
  </ReactModal>
);

export default PostModal;
