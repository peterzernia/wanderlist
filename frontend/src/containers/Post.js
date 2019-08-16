import React, { useEffect } from 'react'
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
import TripReportTruncated from '../components/TripReportTruncated'

import { DotLoader } from 'react-spinners'

export function Post(props) {
  const {
    match,
    fetchSlugTripReports,
    toggleFavorite,
    tripReports,
    fetching,
  } = props

  useEffect(() => {
    async function fetchData() {
      const { slug } = match.params
      fetchSlugTripReports(slug);
    }

    fetchData()
  }, [fetchSlugTripReports, match.params])

  const handleClick = (e) => {
    e.preventDefault();
    toggleFavorite(e.currentTarget.id);
  }

  let listTripReport = tripReports && tripReports.map(tripReport =>(
      <div key={tripReport.id} style={{ marginBottom: 20 }}>
        <TripReportTruncated handleClick={handleClick} {...tripReport} {...props} />
      </div>
    ));

  if (fetching) return <div className='centered'><DotLoader size={50} color={'#2196f3'} className="content" /></div>

  return(
    <div className="content">
      <NotAuthModal {...props} />
      <CopyLinkModal {...props} />
      <CountryModal {...props} />
      <div>{listTripReport}</div>
    </div>
  );
}

const mapState = state => {
  return {
    pk: state.user.user.pk,
    authenticated: state.auth.authenticated,
    tripReports: state.tripReport.slugTripReports,
    fetching: state.tripReport.fetchingSlugTripReports,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
    showNotAuthModal: state.modal.showNotAuthModal,
    showCopyLinkModal: state.modal.showCopyLinkModal,
    modalLink: state.modal.modalLink,
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
