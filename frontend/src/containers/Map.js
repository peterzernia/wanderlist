import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMap from '../components/GoogleMap'
import CountryModal from '../components/CountryModal'
import { openCountryModal, closeCountryModal} from '../actions/modalActions'

class Map extends Component {
  render(){

    return(
      <div className="content">
        {
          (this.props.count === 0)
          ? <p> It looks like you haven't added any places yet. </p>
          : null
        }
        <GoogleMap {...this.props} />
        <CountryModal {...this.props} />
      </div>
    );
  }
}

const mapState = state => {
  return {
    userCountries: state.user.user.countries,
    count: state.user.user.count,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
  };
}

const mapDispatch = dispatch => {
  return {
    openCountryModal: (country) => dispatch(openCountryModal(country)),
    closeCountryModal: () => dispatch(closeCountryModal())
  };
}

export default connect(mapState, mapDispatch)(Map);
