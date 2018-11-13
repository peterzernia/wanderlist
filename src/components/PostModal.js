import React, { Component } from 'react'
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
class PostModal extends Component {
  render(){
    return(
      <ReactModal isOpen={this.props.showPostModal}>
        <div className="close-modal">
          <button onClick={this.props.closePostModal} className="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {
          this.props.updatePostModal
          ? <UpdateTripReportForm modalPost={this.props.modalPost} handleSubmit={this.props.handleUpdateSubmit} />
          : <PostTripReportForm handleSubmit={this.props.handlePostSubmit} />
        }
      </ReactModal>
    )
  }
}

export default PostModal;
