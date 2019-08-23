import React, { useEffect, useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { openEditProfileModal, closeEditProfileModal } from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { fetchCountry } from '../actions/countryActions'
import { fetchNextUserTripReports } from '../actions/tripReportActions'
import { postTripReport, deleteTripReport, updateTripReport } from '../actions/tripReportActions'
import { openPostModal, closePostModal, openUpdatePostModal } from '../actions/modalActions'
import { openCountryModal, closeCountryModal } from '../actions/modalActions'
import { openConfirmDeleteModal, closeConfirmDeleteModal } from '../actions/modalActions'
import { openTripReportModal, closeTripReportModal } from '../actions/modalActions'
import { openCopyLinkModal, closeCopyLinkModal } from '../actions/modalActions'
import { removeError } from '../actions/errorActions'
import { toggleFavorite } from '../actions/favoriteActions'

import OpenStreetMap from '../components/OpenStreetMap'
import EditProfileModal from '../components/EditProfileModal'
import TripReportThumbnail from '../components/TripReportThumbnail'
import TripReportModal from '../components/TripReportModal'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import CountryModal from '../components/CountryModal'
import CopyLinkModal from '../components/CopyLinkModal'
import PostModal from '../components/PostModal'

import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { DotLoader } from 'react-spinners'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Add from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'

export function Profile(props) {
  const {
    next,
    fetchingUserNext,
    fetchNextUserTripReports,
    postTripReport,
    user,
    closePostModal,
    updateTripReport,
    modalPost,
    userCountries,
    putUserData,
    closeEditProfileModal,
    toggleFavorite,
    tripReports,
    location,
    fetched,
    openEditProfileModal,
    posting,
    updating,
    fetchedTripReports,
    openPostModal,
  } = props

  const isBottom = (el) => {
    if (el) return el.getBoundingClientRect().bottom <= window.innerHeight
    return false
  }

  // Infinite scrolling
  const handleScroll = useCallback(() => {
    const el = document.getElementById('scroll');
    if (isBottom(el) && next && !fetchingUserNext) {
      fetchNextUserTripReports(next);
    }
  },[fetchNextUserTripReports, fetchingUserNext, next]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /*
  handlPostSubmit will create a new trip report and handleUpdateSubmit will
  update an existing trip report. Both functions are passed into the Post Modal.
  If the Post Modal is opened with openPostModal, updatePostModal
  remains false and the blank form is displayed, and the submit button will
  create a new post. If the Post Modal is openeed with openUpdatePostModal,
  updatePostModal will flip to true, and the pre-filled in form will
  display and the submit button will update the existing trip report.
  */
  const handlePostSubmit = (e) => {
    e.preventDefault();
    // e.target.countries.value must be split at the comma and then strings
    // must be converted into numbers.
    let countries;
    if (e.target.countries.value !== '') {
      countries = e.target.countries.value.split(',').map(Number);
    }
    postTripReport(
      user.pk,
      e.target.title.value,
      e.target.content.value,
      countries,
    );
    closePostModal();
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    let countries;
    if (e.target.countries.value !== '') {
      countries = e.target.countries.value.split(',').map(Number);
    }
    updateTripReport(
      modalPost.id,
      user.pk,
      e.target.title.value,
      e.target.content.value,
      countries,
    );
    closePostModal();
  }

  /*
  This handle submit works with the edit profile modal.
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    let userCountryList = userCountries.map(country => country.id);
    putUserData(
      e.target.username.value,
      e.target.email.value,
      userCountryList,
      Number(e.target.country.value),
      e.target.biography.value,
      'Your profile has been updated.'
    );
    closeEditProfileModal();
  }

  const handleClick = (e) => {
    e.preventDefault();
    toggleFavorite(e.currentTarget.id);
  }

  const listTripReports = tripReports && tripReports.map(tripReport =>(
      <Grid item key={tripReport.id}>
        <TripReportThumbnail tripReport={tripReport} {...props} />
      </Grid>
    ));

  const isEdit = location.pathname === '/profile'

  if (posting || updating) return <div><DotLoader size={50} color={'#2196f3'} className="content" /><br/></div>

  return(
    <div id='scroll' className='content'>
      <CopyLinkModal {...props} />
      {fetched && <CountryModal {...props} />}
      <EditProfileModal handleSubmit={handleSubmit} {...props} />
      <PostModal {...props} handlePostSubmit={handlePostSubmit} handleUpdateSubmit={handleUpdateSubmit} />
      <ConfirmDeleteModal {...props} />
      {modalPost.author && <TripReportModal handleClick={handleClick} {...props} />}

      {/* This section is the user avatar, username, biography, etc. */}
      <div className='wrap' style={{ marginBottom: 60 }} >
        <div className='left' style={{ width: '37%' }}>
          {user.home && <Avatar style={{ width: 150, height: 150, margin: '0 auto' }} src={user.home.flag}/>}
        </div>
        <div className='right' style={{textAlign: 'left', width: '63%', padding: 10 }}>
          <div style={{ height: 40 }}>
          <Typography variant="h4" gutterBottom>
            {user.username}
          </Typography>
          </div><br/>
          {
            isEdit && (
              <div style={{ height: 40 }}>
              <Button size='small' variant='outlined' onClick={() => openEditProfileModal(user)}>
                Edit Profile
              </Button>
            </div>
            )
          }
          <br/>
          <div style={{ height: 40 }}>
            {user.biography}
          </div>
        </div>
      </div>
      <hr style={{width: '85%', size: 1}}/>

      {/* This section is the user map */}
      {fetched && <OpenStreetMap {...props}/>}
      <hr style={{width: '85%', size: 1}}/>

      {/* This section is the user posts */}
      <div>
        <Tooltip title="New Trip Report">
          <IconButton variant="contained" aria-label="New Trip Report" onClick={openPostModal}>
            <Add />
          </IconButton>
        </Tooltip>
        {fetchedTripReports && <Grid container spacing={10} justify='center' >{listTripReports}</Grid>}
        <div style={{ height: 15 }}/>
        {fetchingUserNext && <DotLoader size={50} color={'#2196f3'} className="content" />}
      </div>
    </div>
  );
}

const mapState = state => {
  return {
    pk: state.user.user.pk,
    authenticated: state.auth.authenticated,
    user: state.user.user,
    next: state.tripReport.userTripReports.next,
    fetched: state.user.fetched,
    fetchingUserNext: state.tripReport.fetchingUserNext,
    searchedCountry: state.country.country,
    showEditProfileModal: state.modal.showEditProfileModal,
    modalProfile: state.modal.modalProfile,
    userCountries: state.user.user.countries,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
    showPostModal: state.modal.showPostModal,
    fetchedTripReports: state.tripReport.fetchedTripReports,
    tripReports: state.tripReport.userTripReports.results,
    updatePostModal: state.modal.updatePostModal,
    modalPost: state.modal.modalPost,
    showConfirmDeleteModal: state.modal.showConfirmDeleteModal,
    showTripReportModal: state.modal.showTripReportModal,
    showCopyLinkModal: state.modal.showCopyLinkModal,
    modalLink: state.modal.modalLink,
    posting: state.tripReport.posting,
    updating: state.tripReport.updating,
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    fetchCountry,
    putUserData,
    openEditProfileModal,
    closeEditProfileModal,
    openCountryModal,
    closeCountryModal,
    removeError,
    postTripReport,
    deleteTripReport,
    updateTripReport,
    openPostModal,
    closePostModal,
    openUpdatePostModal,
    openConfirmDeleteModal,
    closeConfirmDeleteModal,
    openTripReportModal,
    closeTripReportModal,
    fetchNextUserTripReports,
    toggleFavorite,
    openCopyLinkModal,
    closeCopyLinkModal,
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Profile);

Profile.propTypes = {
  pk: PropTypes.number,
  authenticated: PropTypes.bool,
  user: PropTypes.object,
  next: PropTypes.string,
  fetched: PropTypes.bool,
  fetchingUserNext: PropTypes.bool,
  searchedCountry: PropTypes.array,
  showEditProfileModal: PropTypes.bool,
  modalProfile: PropTypes.object,
  userCountries: PropTypes.array,
  showCountryModal: PropTypes.bool,
  modalCountry: PropTypes.object,
  showPostModal: PropTypes.bool,
  fetchedTripReports: PropTypes.bool,
  tripReports: PropTypes.array,
  updatePostModal: PropTypes.bool,
  modalPost: PropTypes.shape({}),
  showConfirmDeleteModal: PropTypes.bool,
  showTripReportModal: PropTypes.bool,
  showCopyLinkModal: PropTypes.bool,
  modalLink: PropTypes.string,
  posting: PropTypes.bool,
  updating: PropTypes.bool,

  fetchCountry: PropTypes.func,
  putUserData: PropTypes.func,
  openEditProfileModal: PropTypes.func,
  closeEditProfileModal: PropTypes.func,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
  removeError: PropTypes.func,
  postTripReport: PropTypes.func,
  deleteTripReport: PropTypes.func,
  updateTripReport: PropTypes.func,
  openPostModal: PropTypes.func,
  closePostModal: PropTypes.func,
  openUpdatePostModal: PropTypes.func,
  openConfirmDeleteModal: PropTypes.func,
  closeConfirmDeleteModal: PropTypes.func,
  openTripReportModal: PropTypes.func,
  closeTripReportModal: PropTypes.func,
  fetchNextUserTripReports: PropTypes.func,
  toggleFavorite: PropTypes.func,
  openCopyLinkModal: PropTypes.func,
  closeCopyLinkModal: PropTypes.func,
};
