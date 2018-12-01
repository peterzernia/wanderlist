import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { openEditProfileModal, closeEditProfileModal } from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { fetchCountry } from '../actions/countryActions'
import { fetchNextUserTripReports } from '../actions/tripReportActions'
import { fetchUserTripReports, postTripReport, deleteTripReport, updateTripReport } from '../actions/tripReportActions'
import { openPostModal, closePostModal, openUpdatePostModal, openCountryModal,
         closeCountryModal, openConfirmDeleteModal, closeConfirmDeleteModal,
         openTripReportModal, closeTripReportModal } from '../actions/modalActions'
import { openCopyLinkModal, closeCopyLinkModal } from '../actions/modalActions'
import { openImageModal, closeImageModal } from '../actions/modalActions'
import { removeError } from '../actions/errorActions'
import { toggleFavorite } from '../actions/favoriteActions'

import GoogleMap from '../components/GoogleMap'
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

/*
This container displays the same information as ViewProfile, but is used for
authenticated users to edit their profile information, and post new Trip
Reports. This is a protected route, so only authenticated users will have
access to editing their profile.
*/
class EditProfile extends Component {

  // Returns True if the user has scrolled past the bottom.
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  // Adds event listener that checks for scrolling.
  componentDidMount() {
    this.props.fetchUserTripReports(localStorage.getItem('username'));
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    this.props.removeError();
    document.removeEventListener('scroll', this.onScroll);
  }

  /*
  If the user has scrolled to the bottom, AND there is next URL to load more
  Trip Reports, AND the next Trip Reports are not already being fetched, the
  next Trip Reports will be fetched i.e. infinite scrolling.
  */
  onScroll = () => {
    const element = document.getElementById('scroll');
    if (this.isBottom(element) && this.props.next && !this.props.fetchingUserNext && !this.props.fetchingTripReports) {
      this.props.fetchNextUserTripReports(this.props.next);
    }
  };

  /*
  handlPostSubmit will create a new trip report and handleUpdateSubmit will
  update an existing trip report. Both functions are passed into the Post Modal.
  If the Post Modal is opened with openPostModal, this.props.updatePostModal
  remains false and the blank form is displayed, and the submit button will
  create a new post. If the Post Modal is openeed with openUpdatePostModal,
  this.props.updatePostModal will flip to true, and the pre-filled in form will
  display and the submit button will update the existing trip report.
  */
  handlePostSubmit = (e) => {
    e.preventDefault();
    // e.target.countries.value must be split at the comma and then strings
    // must be converted into numbers.
    let countries = e.target.countries.value.split(',').map(Number);
    this.props.postTripReport(
      this.props.user.pk,
      e.target.title.value,
      e.target.content.value,
      countries,
      e.target.image.files[0]
    );
    this.props.closePostModal();
  }

  handleUpdateSubmit = (e) => {
    e.preventDefault();
    let countries = e.target.countries.value.split(',').map(Number);
    this.props.updateTripReport(
      this.props.modalPost.id,
      this.props.user.pk,
      e.target.title.value,
      e.target.content.value,
      countries,
      e.target.image.files[0]
    );
    this.props.closePostModal();
  }

  /*
  This handle submit works with the edit profile modal.
  */
  handleSubmit = (e) => {
    e.preventDefault();
    let userCountryList = this.props.userCountries.map(country => country.id);
    this.props.putUserData(
      e.target.username.value,
      e.target.email.value,
      userCountryList,
      Number(e.target.country.value),
      e.target.biography.value,
      'Your profile has been updated.'
    );
    this.props.closeEditProfileModal();
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.toggleFavorite(e.currentTarget.id);
  }

  render(){

    /*
    List out Trip Reports to display in Material UI grid component.
    */
    let listTripReports = null;
    if (this.props.tripReports){
      listTripReports = this.props.tripReports.map(tripReport =>(
        <Grid item key={tripReport.id}>
          <TripReportThumbnail tripReport={tripReport} {...this.props} />
        </Grid>
      ));
    }

    return(
      <div id='scroll' className='content'>
        <CopyLinkModal {...this.props} />
        {this.props.fetched && <CountryModal {...this.props} />}
        <EditProfileModal handleSubmit={this.handleSubmit} {...this.props} />
        <PostModal {...this.props} handlePostSubmit={this.handlePostSubmit} handleUpdateSubmit={this.handleUpdateSubmit} />
        <ConfirmDeleteModal {...this.props} />
        {this.props.modalPost.author && <TripReportModal handleClick={this.handleClick} {...this.props} />}

        {/* This section is the user avatar, username, biography, etc. */}
        <div className='wrap' style={{ marginBottom: 60 }} >
          <div className='left' style={{ width: '37%' }}>
            {this.props.user.home && <Avatar style={{ width: 150, height: 150, margin: '0 auto' }} src={this.props.user.home.flag}/>}
          </div>
          <div className='right' style={{textAlign: 'left', width: '63%', padding: 10 }}>
            <div style={{ height: 40 }}>
            <Typography variant="h4" gutterBottom>
              {this.props.user.username}
            </Typography>
            </div><br/>
            <div style={{ height: 40 }}>
              <Button size='small' variant='outlined' onClick={() => this.props.openEditProfileModal(this.props.user)}>
                Edit Profile
              </Button>
            </div><br/>
            <div style={{ height: 40 }}>
              {this.props.user.biography}
            </div>
          </div>
        </div>
        <hr style={{width: '85%', size: 1}}/>

        {/* This section is the user map */}
        {this.props.fetched && <GoogleMap {...this.props}/>}
        <hr style={{width: '85%', size: 1}}/>

        {/* This section is the user posts */}
        <div className="">
          <Tooltip title="New Trip Report">
            <IconButton variant="contained" aria-label="New Trip Report" onClick={this.props.openPostModal}>
              <Add />
            </IconButton>
          </Tooltip>
          {this.props.posting && <div><DotLoader size={50} color={'#2196f3'} className="content" /><br/></div>}
          {this.props.updating && <div><DotLoader size={50} color={'#2196f3'} className="content" /><br/></div>}
          {this.props.fetchingTripReports && <div><DotLoader size={50} color={'#2196f3'} className="content" /></div>}
          {this.props.fetchedTripReports && <Grid container spacing={24} justify='center' >{listTripReports}</Grid>}
          <div style={{ height: 15 }}/>
          {this.props.fetchingUserNext && <DotLoader size={50} color={'#2196f3'} className="content" />}
        </div>
      </div>
    );
  }
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
    fetchingTripReports: state.tripReport.fetchingTripReports,
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
    showImageModal: state.modal.showImageModal,
    modalImage: state.modal.modalImage,
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
    fetchUserTripReports,
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
    openImageModal,
    closeImageModal,
  }, dispatch);
}

export default connect(mapState, mapDispatch)(EditProfile);

EditProfile.propTypes = {
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
  fetchingTripReports: PropTypes.bool,
  fetchedTripReports: PropTypes.bool,
  tripReports: PropTypes.array,
  updatePostModal: PropTypes.bool,
  modalPost: PropTypes.object,
  showConfirmDeleteModal: PropTypes.bool,
  showTripReportModal: PropTypes.bool,
  showCopyLinkModal: PropTypes.bool,
  modalLink: PropTypes.string,
  posting: PropTypes.bool,
  updating: PropTypes.bool,
  showImageModal: PropTypes.bool,
  modalImage: PropTypes.string,

  fetchCountry: PropTypes.func,
  putUserData: PropTypes.func,
  openEditProfileModal: PropTypes.func,
  closeEditProfileModal: PropTypes.func,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
  removeError: PropTypes.func,
  fetchUserTripReports: PropTypes.func,
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
  openImageModal: PropTypes.func,
  closeImageModal: PropTypes.func,
};
