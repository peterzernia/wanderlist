import React, { Component } from 'react'
import ReactModal from 'react-modal'
import PostTripReportForm from './PostTripReportForm'

ReactModal.setAppElement('body');

class PostModal extends Component {
  render(){
    return(
      <ReactModal isOpen={this.props.showPostModal}>
        <div className="close-modal">
          <button onClick={this.props.closePostModal} className="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <PostTripReportForm handleSubmit={this.props.handleSubmit}/>
      </ReactModal>
    )
  }
}

export default PostModal;
