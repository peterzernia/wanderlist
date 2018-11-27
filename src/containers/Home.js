import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { openCountryModal, closeCountryModal } from '../actions/modalActions'
import { removeError } from '../actions/errorActions'
import { toggleFavorite } from '../actions/favoriteActions'

import TripReportTruncated from '../components/TripReportTruncated'
import CountryModal from '../components/CountryModal'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { DotLoader } from 'react-spinners'
import Typography from '@material-ui/core/Typography'

class Home extends Component {

  componentWillUnmount() {
    this.props.removeError();
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.toggleFavorite(e.currentTarget.id);
  }

  render(){

    let listTripReports = null;
    if (this.props.tripReports){
      listTripReports = this.props.tripReports.map(tripReport =>(
        <div key={tripReport.id} style={{ marginBottom: 20 }}>
          <TripReportTruncated handleClick={this.handleClick} {...tripReport} {...this.props} openCountryModal={this.props.openCountryModal}/>
        </div>
      ));
    }

    return(
      <div >
        {this.props.modalCountry && <CountryModal {...this.props} />}
        <div className='header-img'>
          <Typography variant="h2" gutterBottom style={{ color: 'white', paddingTop: 200 }}>
            Connect, Learn, Share
          </Typography>
        </div>
        <div style={{ marginTop: 60, textAlign: 'center' }}>
          <h2>Search for Countries and Territories</h2>
          <img style={{ margin: '0 auto' }} src={require('../../src/country.png')} />
        </div>
        <div style={{marginTop: 60, textAlign: 'center' }}>
          <h2>Add them to your personalized map</h2>
          <img style={{ margin: '0 auto' }} src={require('../../src/map.png')} />
        </div>
        <div className='content' style={{ margin: '0 auto', marginTop: 30 }}>
          <h2>Post Trip Reports about journeys you've taken</h2>
          <div style={{ textAlign: 'left', width: '90%', margin: '0 auto' }}>
            Featured Article
          </div>
          {
            this.props.tripReports
            ? <div>{listTripReports[0]}</div>
            : <DotLoader size={50} color={'#2196f3'} className="content" />
          }
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    tripReports: state.tripReport.tripReports.results,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
    pk: state.user.user.pk,
    authenticated: state.auth.authenticated,
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    removeError,
    toggleFavorite,
    openCountryModal,
    closeCountryModal
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Home);

Home.propTypes = {
  tripReport: PropTypes.array,
  showCountryModal: PropTypes.bool,
  modalCountry: PropTypes.object,
  pk: PropTypes.number,
  authenticated: PropTypes.bool,
  removeError: PropTypes.func,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
};
