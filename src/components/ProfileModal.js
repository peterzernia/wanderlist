import React from 'react'
import ReactModal from 'react-modal'
import EditProfileForm from './EditProfileForm'

ReactModal.setAppElement('body');

const ProfileModal = (props) => (
  <ReactModal isOpen={props.showProfileModal}>
    <div className="close-modal">
      <button onClick={props.closeProfileModal} className="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <EditProfileForm {...props}/>
  </ReactModal>
);

export default ProfileModal;
