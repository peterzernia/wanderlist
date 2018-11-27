import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { openCopyLinkModal, closeCopyLinkModal } from '../actions/modalActions'
import { fetchSlugTripReports } from '../actions/tripReportActions'
import { openCountryModal, closeCountryModal } from '../actions/modalActions'
import { openNotAuthModal, closeNotAuthModal } from '../actions/modalActions'
import { removeError } from '../actions/errorActions'
import { toggleFavorite } from '../actions/favoriteActions'

import CountryModal from '../components/CountryModal'
import CopyLinkModal from '../components/CopyLinkModal'
import NotAuthModal from '../components/NotAuthModal'
import TripReport from '../components/TripReport'

import { DotLoader } from 'react-spinners'

/*
This component creates a link off the posts slug, so that users can share and
access posts externally.
*/
class Post extends Component {

  componentDidMount () {
    const { slug } = this.props.match.params
    this.props.fetchSlugTripReports(slug);
  }

  componentWillUnmount() {
    this.props.removeError();
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.toggleFavorite(e.currentTarget.id);
  }

  render(){

    let listTripReport = null;
    if (this.props.tripReports){
      listTripReport = this.props.tripReports.map(tripReport =>(
        <div key={tripReport.id} style={{ marginBottom: 20 }}>
          <TripReport handleClick={this.handleClick} {...tripReport} {...this.props} openCountryModal={this.props.openCountryModal}/>
        </div>
      ));
    }

    return(
      <div className="content">
        <NotAuthModal {...this.props} />
        <CopyLinkModal {...this.props} />
        {this.props.fetching && <div className='centered'><DotLoader size={50} color={'#2196f3'} className="content" /></div>}
        {this.props.fetched && <CountryModal {...this.props} />}
        {this.props.fetched && <div>{listTripReport}</div>}
      </div>
    );
  }
}

const mapState = state => {
  return {
    pk: state.user.user.pk,
    authenticated: state.auth.authenticated,
    tripReports: state.tripReport.slugTripReports.results,
    fetched: state.tripReport.fetchedSlugTripReports,
    fetching: state.tripReport.fetchingSlugTripReports,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
    showNotAuthModal: state.modal.showNotAuthModal,
    showCopyLinkModal: state.modal.showCopyLinkModal,
    modalLink: state.modal.modalLink
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    fetchSlugTripReports,
    removeError,
    openCountryModal,
    closeCountryModal,
    toggleFavorite,
    openNotAuthModal,
    closeNotAuthModal,
    openCopyLinkModal,
    closeCopyLinkModal,
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Post);

Post.propTypes = {
  pk: PropTypes.number,
  authenticated: PropTypes.bool,
  tripReport: PropTypes.array,
  fetched: PropTypes.bool,
  showCountryModal: PropTypes.bool,
  modalCountry: PropTypes.object,
  showNotAuthModal: PropTypes.bool,
  showCopyLinkModal: PropTypes.bool,
  modalLink: PropTypes.string,

  fetchSlugTripReports: PropTypes.func,
  removeError: PropTypes.func,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
  toggleFavorite: PropTypes.func,
  openNotAuthModal: PropTypes.func,
  closeNotAuthModal: PropTypes.func,
  openCopyLinkModal: PropTypes.func,
  closeCopyLinkModal: PropTypes.func,
};
