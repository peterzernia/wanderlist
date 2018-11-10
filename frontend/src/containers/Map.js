import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMap from '../components/GoogleMap'
import Modal from '../components/Modal'
import { openModal, closeModal} from '../actions/modalActions'

class Map extends Component {
  render(){

    return(
      <div className="content">
        <h1>My Map</h1>
        {
          (this.props.count === 0)
          ? <p> It looks like you haven't added any places yet. </p>
          : null
        }
        <GoogleMap {...this.props} />
        <Modal {...this.props} />
      </div>
    );
  }
}

const mapState = state => {
  return {
    userCountries: state.user.user.countries,
    count: state.user.user.count,
    showModal: state.modal.showModal,
    modalCountry: state.modal.modalCountry,
  };
}

const mapDispatch = dispatch => {
  return {
    openModal: (country) => dispatch(openModal(country)),
    closeModal: () => dispatch(closeModal())
  };
}

export default connect(mapState, mapDispatch)(Map);
