import React, { Component } from 'react'
import ReactModal from 'react-modal'
import EditProfileForm from './EditProfileForm'

ReactModal.setAppElement('body');

class ProfileModal extends Component {
  render(){
    return(
      <ReactModal isOpen={this.props.showProfileModal}>
        <div className="close-modal">
          <button onClick={this.props.closeProfileModal} className="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <EditProfileForm {...this.props}/>
      </ReactModal>
    )
  }
}

export default ProfileModal;
