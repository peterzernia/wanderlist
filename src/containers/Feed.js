import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import CountryModal from '../components/CountryModal'
import TripReport from '../components/TripReport'
import { openCountryModal, closeCountryModal } from '../actions/modalActions'
import { fetchNextTripReports } from '../actions/tripReportActions'
import { removeError } from '../actions/errorActions'
import { DotLoader } from 'react-spinners';
import Button from '@material-ui/core/Button'

class Home extends Component {

  componentWillUnmount() {
    this.props.removeError();
  }

  render(){

    let listTripReports = null;
    if (this.props.tripReports){
      listTripReports = this.props.tripReports.map(tripReport =>(
        <div key={tripReport.id} className='trip-report'>
          <TripReport {...tripReport} openCountryModal={this.props.openCountryModal}/>
        </div>
      ));
    }

    return(
      <div className="content">
        {this.props.fetching && <div className='centered'><DotLoader size={50} color={'#2196f3'} className="content" /></div>}
        {this.props.fetched && <CountryModal {...this.props} />}
        {this.props.fetched && <div>{listTripReports}</div>}
        {this.props.fetchingNext && <DotLoader size={50} color={'#2196f3'} className="content" />}
        {this.props.next && <Button onClick={() => this.props.fetchNextTripReports(this.props.next)}>Load More</Button>}
      </div>
    );
  }
}

const mapState = state => {
  return {
    fetched: state.tripReport.fetched,
    fetching: state.tripReport.fetching,
    next: state.tripReport.tripReports.next,
    fetchingNext: state.tripReport.fetchingNext,
    tripReports: state.tripReport.tripReports.results,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    openCountryModal,
    closeCountryModal,
    removeError,
    fetchNextTripReports,
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Home);

Home.propTypes = {
  fetched: PropTypes.bool,
  fetching: PropTypes.bool,
  next: PropTypes.string,
  tripReports: PropTypes.array,
  showCountryModal: PropTypes.bool,
  modalCountry: PropTypes.object,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
  removeError: PropTypes.func,
  fetchNextTripReports: PropTypes.func,
};
