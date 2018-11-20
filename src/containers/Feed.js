import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import CountryModal from '../components/CountryModal'
import TripReport from '../components/TripReport'
import { openCountryModal, closeCountryModal } from '../actions/modalActions'
import { removeError } from '../actions/errorActions'
import { DotLoader } from 'react-spinners';

class Home extends Component {

  componentWillUnmount() {
    this.props.removeError();
  }

  render(){

    const listTripReports = this.props.tripReports.map(tripReport =>(
      <div key={tripReport.id} className='trip-report'>
        <TripReport {...tripReport} openCountryModal={this.props.openCountryModal}/>
      </div>
    ));

    return(
      <div className="">
        {this.props.fetched && <CountryModal {...this.props} />}
        {this.props.fetching && <DotLoader size={50} color={'#2196f3'} className="content" />}
        {this.props.fetched && <div>{listTripReports}</div>}
      </div>
    );
  }
}

const mapState = state => {
  return {
    fetched: state.tripReport.fetched,
    fetching: state.tripReport.fetching,
    tripReports: state.tripReport.tripReports,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    openCountryModal,
    closeCountryModal,
    removeError
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Home);

Home.propTypes = {
  fetched: PropTypes.bool,
  fetching: PropTypes.bool,
  tripReports: PropTypes.array,
  showCountryModal: PropTypes.bool,
  modalCountry: PropTypes.object,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
  removeError: PropTypes.func
};
