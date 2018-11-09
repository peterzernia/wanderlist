import React, { Component } from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root');

class Modal extends Component {
  render(){
      console.log(this.props.searchedCountry)
    return(
      <ReactModal isOpen={this.props.showModal}>
        <div className="close-modal">
          <button onClick={this.props.closeModal} className="btn btn-dark"> X </button>
        </div>
        <div className="content">
          Name
        </div>
      </ReactModal>
    )
  }
}

export default Modal;
