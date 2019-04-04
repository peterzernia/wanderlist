import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { openCopyLinkModal, closeCopyLinkModal } from '../actions/modalActions'
import { openCountryModal, closeCountryModal } from '../actions/modalActions'
import { openImageModal, closeImageModal } from '../actions/modalActions'
import { openNotAuthModal, closeNotAuthModal } from '../actions/modalActions'
import { removeError } from '../actions/errorActions'
import { toggleFavorite } from '../actions/favoriteActions'

import CopyLinkModal from '../components/CopyLinkModal'
import CountryModal from '../components/CountryModal'
import ImageModal from '../components/ImageModal'
import NotAuthModal from '../components/NotAuthModal'
import TripReportTruncated from '../components/TripReportTruncated'

import { DotLoader } from 'react-spinners'
import Typography from '@material-ui/core/Typography'

export class Home extends Component {

  componentWillUnmount() {
    this.props.removeError();
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.toggleFavorite(e.currentTarget.id);
  }

  render(){

    let featuredTripReport = null;
    if (this.props.tripReport){
      featuredTripReport = this.props.tripReport.map(tripReport =>(
        <div key={tripReport.id} style={{ marginBottom: 20 }}>
          <TripReportTruncated handleClick={this.handleClick} {...tripReport} {...this.props} openCountryModal={this.props.openCountryModal}/>
        </div>
      ));
    }

    return(
      <div >
        <NotAuthModal {...this.props} />
        <CopyLinkModal {...this.props} />
        <ImageModal {...this.props} />
        {this.props.modalCountry && <CountryModal {...this.props} />}
        <div className='header-img'>
          <Typography variant="h2" gutterBottom style={{ color: 'white', paddingTop: 200 }}>
            Connect, Learn, Share
          </Typography>
        </div>
        <div style={{ marginTop: 60, textAlign: 'center' }}>
          <h2>Search for Countries and Territories</h2>
          <img style={{ margin: '0 auto' }} src='https://raw.githubusercontent.com/peterzernia/wanderlist/master/images/country.png' alt='' />
        </div>
        <div style={{marginTop: 60, textAlign: 'center' }}>
          <h2>Add them to your personalized map</h2>
          <img style={{ margin: '0 auto' }} src='https://raw.githubusercontent.com/peterzernia/wanderlist/master/images/map.png' alt='' />
        </div>
        <div className='content' style={{ margin: '0 auto', marginTop: 30 }}>
          <h2>Post Trip Reports about journeys you've taken</h2>
          <div style={{ textAlign: 'left', width: '90%', margin: '0 auto' }}>
            Featured Trip Report
          </div>
          {
            this.props.tripReport
            ? <div>{featuredTripReport}</div>
            : <DotLoader size={50} color={'#2196f3'} className="content" />
          }
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    tripReport: state.tripReport.featuredTripReport,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
    pk: state.user.user.pk,
    authenticated: state.auth.authenticated,
    showNotAuthModal: state.modal.showNotAuthModal,
    showCopyLinkModal: state.modal.showCopyLinkModal,
    modalLink: state.modal.modalLink,
    showImageModal: state.modal.showImageModal,
    modalImage: state.modal.modalImage
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    removeError,
    toggleFavorite,
    openCountryModal,
    closeCountryModal,
    openNotAuthModal,
    closeNotAuthModal,
    openCopyLinkModal,
    closeCopyLinkModal,
    openImageModal,
    closeImageModal
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Home);

Home.propTypes = {
  tripReport: PropTypes.array,
  showCountryModal: PropTypes.bool,
  modalCountry: PropTypes.object,
  pk: PropTypes.number,
  authenticated: PropTypes.bool,
  showNotAuthModal: PropTypes.bool,
  showCopyLinkModal: PropTypes.bool,
  modalLink: PropTypes.string,
  showImageModal: PropTypes.bool,
  modalImage: PropTypes.string,

  removeError: PropTypes.func,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
  openCopyLinkModal: PropTypes.func,
  closeCopyLinkModal: PropTypes.func,
  openImageModal: PropTypes.func,
  closeImageModal: PropTypes.func,
};
