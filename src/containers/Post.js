import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
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

class Post extends Component {

  componentWillUnmount() {
    this.props.removeError();
  }

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
      this.props.pk,
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
      this.props.pk,
      e.target.title.value,
      e.target.content.value,
      countries
    );
    this.props.closePostModal();
  }

  render(){

    const listTripReports = this.props.tripReports.map(tripReport =>(
      <Grid item key={tripReport.id}>
        <TripReportThumbnail tripReport={tripReport} {...this.props} />
      </Grid>
    ));

    return(
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
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    username: state.user.user.username,
    pk: state.user.user.pk,
    showPostModal: state.modal.showPostModal,
    fetchingTripReports: state.tripReport.fetchingTripReports,
    fetchedTripReports: state.tripReport.fetchedTripReports,
    tripReports: state.tripReport.userTripReports,
    updatePostModal: state.modal.updatePostModal,
    modalPost: state.modal.modalPost,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
    showConfirmDeleteModal: state.modal.showConfirmDeleteModal,
    showTripReportModal: state.modal.showTripReportModal
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    fetchUserTripReports,
    postTripReport,
    deleteTripReport,
    updateTripReport,
    openPostModal,
    closePostModal,
    openUpdatePostModal,
    openCountryModal,
    closeCountryModal,
    openConfirmDeleteModal,
    closeConfirmDeleteModal,
    openTripReportModal,
    closeTripReportModal,
    removeError
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Post);

Post.propTypes = {
  user: PropTypes.object,
  username: PropTypes.string,
  pk: PropTypes.number,
  showPostModal: PropTypes.bool,
  fetchingTripReports: PropTypes.bool,
  fetchedTripReports: PropTypes.bool,
  tripReports: PropTypes.array,
  updatePostModal: PropTypes.bool,
  modalPost: PropTypes.object,
  showCountryModal: PropTypes.bool,
  modalCountry: PropTypes.object,
  showConfirmDeleteModal: PropTypes.bool,
  showTripReportModal: PropTypes.bool,
  fetchUserTripReports: PropTypes.func,
  postTripReport: PropTypes.func,
  deleteTripReport: PropTypes.func,
  updateTripReport: PropTypes.func,
  openPostModal: PropTypes.func,
  closePostModal: PropTypes.func,
  openUpdatePostModal: PropTypes.func,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
  openConfirmDeleteModal: PropTypes.func,
  closeConfirmDeleteModal: PropTypes.func,
  openTripReportModal: PropTypes.func,
  closeTripReportModal: PropTypes.func
};

// const listTripReports = this.props.tripReports.map(tripReport =>(
//   <div key={tripReport.id} className='trip-report'>
//     <TripReport {...tripReport} openCountryModal={this.props.openCountryModal} />
//     <Button variant="contained" color="primary" onClick={() => this.props.openUpdatePostModal(tripReport)}>Update</Button>
//     <Button variant='outlined' color="secondary" onClick={() => this.props.openConfirmDeleteModal(tripReport)}>Delete</Button>
//   </div>
// ));
