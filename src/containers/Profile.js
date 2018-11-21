import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GoogleMap from '../components/GoogleMap'
import EditProfileModal from '../components/EditProfileModal'
import { openEditProfileModal, closeEditProfileModal } from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { fetchCountry } from '../actions/countryActions'
import { fetchNextUserTripReports } from '../actions/tripReportActions'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import CountryModal from '../components/CountryModal'
import PostModal from '../components/PostModal'
import TripReportThumbnail from '../components/TripReportThumbnail'
import TripReportModal from '../components/TripReportModal'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import { fetchUserTripReports, postTripReport, deleteTripReport, updateTripReport } from '../actions/tripReportActions'
import { openPostModal, closePostModal, openUpdatePostModal, openCountryModal,
         closeCountryModal, openConfirmDeleteModal, closeConfirmDeleteModal,
         openTripReportModal, closeTripReportModal } from '../actions/modalActions'
import { removeError } from '../actions/errorActions'
import { DotLoader } from 'react-spinners'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Add from '@material-ui/icons/Add'
import Tooltip from '@material-ui/core/Tooltip';

class Profile extends Component {

  // Returns True if the user has scrolled past the bottom.
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  // Adds event listener that checks for scrolling.
  componentDidMount() {
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    this.props.removeError();
    document.removeEventListener('scroll', this.onScroll);
  }

  /*
  If the user has scrolled to the bottom, AND there is next URL to load more
  Trip Reports, AND the next Trip Reports are not already being fetched, the
  next Trip Reports will be fetched.
  */
  onScroll = () => {
    const element = document.getElementById('scroll');
    if (this.isBottom(element) && this.props.next && !this.props.fetchingNext) {
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
    let countries;
    if (e.target.countries.value !== '') {
      countries = e.target.countries.value.split(',').map(Number);
    }
    this.props.postTripReport(
      this.props.user.pk,
      e.target.title.value,
      e.target.content.value,
      countries
    );
    this.props.closePostModal();
  }

  handleUpdateSubmit = (e) => {
    e.preventDefault();
    let countries;
    if (e.target.countries.value !== '') {
      countries = e.target.countries.value.split(',').map(Number);
    }
    this.props.updateTripReport(
      this.props.modalPost.id,
      this.props.user.pk,
      e.target.title.value,
      e.target.content.value,
      countries
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
      e.target.biography.value
    );
    this.props.closeEditProfileModal();
  }

  render(){

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
        {this.props.fetched && <CountryModal {...this.props} />}
        <EditProfileModal handleSubmit={this.handleSubmit} {...this.props} />
        <div className='wrap' style={{ marginBottom: 60 }} >
          <div className='left' style={{ width: '37%' }}>
            {this.props.user.home && <Avatar style={{ width: 150, height: 150, margin: '0 auto' }} src={this.props.user.home.flag}/>}
          </div>
          <div className='right' style={{textAlign: 'left', width: '63%', padding: 10 }}>
            <div style={{ height: 30 }}>
            <Typography variant="h4" gutterBottom>
              {this.props.user.username}
            </Typography>
            </div><br/>
            <div style={{ height: 30 }}>
              <Button size='small' variant='outlined' onClick={() => this.props.openEditProfileModal(this.props.user)}>
                Edit Profile
              </Button>
            </div><br/>
            <div style={{ height: 30, maxWidth: '75%' }}>
              {this.props.user.biography}
            </div>
          </div>
        </div>
        <hr style={{width: '85%', size: 1}}/>
        {this.props.fetched && <GoogleMap {...this.props}/>}
        <hr style={{width: '85%', size: 1}}/>
        <div className="content">
          <Tooltip title="New Trip Report">
            <IconButton variant="contained" aria-label="New Trip Report" onClick={this.props.openPostModal}>
              <Add />
            </IconButton>
          </Tooltip>
          <PostModal {...this.props} handlePostSubmit={this.handlePostSubmit} handleUpdateSubmit={this.handleUpdateSubmit} />
          <ConfirmDeleteModal {...this.props} />
          {this.props.modalPost.author && <TripReportModal {...this.props} />}
          {this.props.fetchingTripReports && <div><DotLoader size={50} color={'#2196f3'} className="content" /></div>}
          {this.props.fetchedTripReports && <Grid container spacing={24} justify='center' >{listTripReports}</Grid>}
          {this.props.fetchingNext && <DotLoader size={50} color={'#2196f3'} className="content" />}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    next: state.tripReport.userTripReports.next,
    fetched: state.user.fetched,
    fetchingNext: state.tripReport.fetchingNext,
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
    showTripReportModal: state.modal.showTripReportModal
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
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Profile);

Profile.propTypes = {
  user: PropTypes.object,
  next: PropTypes.string,
  fetched: PropTypes.bool,
  fetchingNext: PropTypes.bool,
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
  fetchNextUserTripReports: PropTypes.func
};
