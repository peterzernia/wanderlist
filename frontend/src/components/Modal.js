import React, { Component } from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('#root');

class Modal extends Component {
  render(){
    return(
      <ReactModal isOpen={this.props.showModal}>
        <div className="close-modal">
          <button onClick={this.props.closeModal} className="btn btn-dark"> X </button>
        </div>
        <div className="content">
          <h3>{this.props.modalCountry.name}</h3>
          <img className="flag" src={this.props.modalCountry.flag} alt=""/><br/>
        </div>
      </ReactModal>
    )
  }
}

export default Modal;
