import React, { useEffect, useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  func, number, bool, shape, arrayOf, string,
} from 'prop-types'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { DotLoader } from 'react-spinners'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Add from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip'
import {
  openCountryModal,
  closeCountryModal,
  openEditProfileModal,
  closeEditProfileModal,
  openPostModal,
  closePostModal,
  openUpdatePostModal,
  openConfirmDeleteModal,
  closeConfirmDeleteModal,
  openTripReportModal,
  closeTripReportModal,
  openCopyLinkModal,
  closeCopyLinkModal,
} from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { fetchCountry } from '../actions/countryActions'
import {
  fetchNextUserTripReports, postTripReport, deleteTripReport, updateTripReport,
} from '../actions/tripReportActions'
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


export function Profile(props) {
  const {
    next,
    fetchingUserNext,
    user,
    modalPost,
    userCountries,
    tripReports,
    location,
    fetched,
    posting,
    updating,
    fetchedTripReports,
  } = props

  const isBottom = (el) => {
    if (el) return el.getBoundingClientRect().bottom <= window.innerHeight
    return false
  }

  // Infinite scrolling
  const handleScroll = useCallback(() => {
    const el = document.getElementById('scroll')
    if (isBottom(el) && next && !fetchingUserNext) {
      props.fetchNextUserTripReports(next)
    }
    // eslint-disable-next-line
  }, [props.fetchNextUserTripReports, fetchingUserNext, next])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

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
    e.preventDefault()
    // e.target.countries.value must be split at the comma and then strings
    // must be converted into numbers.
    let countries
    if (e.target.countries.value !== '') {
      countries = e.target.countries.value.split(',').map(Number)
    }
    props.postTripReport(
      user.pk,
      e.target.title.value,
      e.target.content.value,
      countries,
    )
    props.closePostModal()
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    let countries
    if (e.target.countries.value !== '') {
      countries = e.target.countries.value.split(',').map(Number)
    }
    props.updateTripReport(
      modalPost.id,
      user.pk,
      e.target.title.value,
      e.target.content.value,
      countries,
    )
    props.closePostModal()
  }

  /*
  This handle submit works with the edit profile modal.
  */
  const handleSubmit = (e) => {
    e.preventDefault()
    const userCountryList = userCountries.map((country) => country.id)
    props.putUserData(
      e.target.username.value,
      e.target.email.value,
      userCountryList,
      Number(e.target.country.value),
      e.target.biography.value,
      'Your profile has been updated.',
    )
    props.closeEditProfileModal()
  }

  const handleClick = (e) => {
    e.preventDefault()
    props.toggleFavorite(e.currentTarget.id)
  }

  const listTripReports = tripReports && tripReports.map((tripReport) => (
    <Grid item key={tripReport.id}>
      <TripReportThumbnail tripReport={tripReport} {...props} />
    </Grid>
    ))

  const isEdit = location.pathname === '/profile'

  if (posting || updating) {
 return (
   <div>
     <DotLoader size={50} color="#2196f3" className="content" />
     <br />
   </div>
)
 }

  return (
    <div id="scroll" className="content">
      <CopyLinkModal {...props} />
      {fetched && <CountryModal {...props} />}
      <EditProfileModal handleSubmit={handleSubmit} {...props} />
      <PostModal
        {...props}
        handlePostSubmit={handlePostSubmit}
        handleUpdateSubmit={handleUpdateSubmit}
      />
      <ConfirmDeleteModal {...props} />
      {modalPost.author && <TripReportModal handleClick={handleClick} {...props} />}

      {/* This section is the user avatar, username, biography, etc. */}
      <div className="wrap" style={{ marginBottom: 60 }}>
        <div className="left" style={{ width: '37%' }}>
          {user.home && <Avatar style={{ width: 150, height: 150, margin: '0 auto' }} src={user.home.flag} />}
        </div>
        <div className="right" style={{ textAlign: 'left', width: '63%', padding: 10 }}>
          <div style={{ height: 40 }}>
            <Typography variant="h4" gutterBottom>
              {user.username}
            </Typography>
          </div>
          <br />
          {
            isEdit && (
              <div style={{ height: 40 }}>
                <Button size="small" variant="outlined" onClick={() => props.openEditProfileModal(user)}>
                Edit Profile
                </Button>
              </div>
            )
          }
          <br />
          <div style={{ height: 40 }}>
            {user.biography}
          </div>
        </div>
      </div>
      <hr style={{ width: '85%', size: 1 }} />

      {/* This section is the user map */}
      {fetched && <OpenStreetMap {...props} />}
      <hr style={{ width: '85%', size: 1 }} />

      {/* This section is the user posts */}
      <div>
        <Tooltip title="New Trip Report">
          <IconButton variant="contained" aria-label="New Trip Report" onClick={props.openPostModal}>
            <Add />
          </IconButton>
        </Tooltip>
        {fetchedTripReports && <Grid container spacing={10} justify="center">{listTripReports}</Grid>}
        <div style={{ height: 15 }} />
        {fetchingUserNext && <DotLoader size={50} color="#2196f3" className="content" />}
      </div>
    </div>
  )
}

const mapState = (state) => ({
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
  })

const mapDispatch = (dispatch) => bindActionCreators({
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
  }, dispatch)

export default connect(mapState, mapDispatch)(Profile)

Profile.propTypes = {
  pk: number,
  authenticated: bool.isRequired,
  user: shape({}).isRequired,
  next: string,
  fetched: bool.isRequired,
  fetchingUserNext: bool.isRequired,
  searchedCountry: arrayOf(shape({})).isRequired,
  showEditProfileModal: bool.isRequired,
  modalProfile: shape({}).isRequired,
  userCountries: arrayOf(shape({})).isRequired,
  showCountryModal: bool.isRequired,
  modalCountry: shape({}).isRequired,
  showPostModal: bool.isRequired,
  fetchedTripReports: bool.isRequired,
  tripReports: arrayOf(shape({})).isRequired,
  updatePostModal: bool.isRequired,
  modalPost: shape({}).isRequired,
  showConfirmDeleteModal: bool.isRequired,
  showTripReportModal: bool.isRequired,
  showCopyLinkModal: bool.isRequired,
  modalLink: string,
  posting: bool.isRequired,
  updating: bool.isRequired,
  fetchCountry: func.isRequired,
  putUserData: func.isRequired,
  openEditProfileModal: func.isRequired,
  closeEditProfileModal: func.isRequired,
  openCountryModal: func.isRequired,
  closeCountryModal: func.isRequired,
  removeError: func.isRequired,
  postTripReport: func.isRequired,
  deleteTripReport: func.isRequired,
  updateTripReport: func.isRequired,
  openPostModal: func.isRequired,
  closePostModal: func.isRequired,
  openUpdatePostModal: func.isRequired,
  openConfirmDeleteModal: func.isRequired,
  closeConfirmDeleteModal: func.isRequired,
  openTripReportModal: func.isRequired,
  closeTripReportModal: func.isRequired,
  fetchNextUserTripReports: func.isRequired,
  toggleFavorite: func.isRequired,
  openCopyLinkModal: func.isRequired,
  closeCopyLinkModal: func.isRequired,
  location: shape({}).isRequired,
}

Profile.defaultProps = {
  modalLink: '',
  pk: null,
  next: '',
}
