import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CountryModal from '../components/CountryModal'
import PostModal from '../components/PostModal'
import TripReport from '../components/TripReport'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'
import { fetchUserTripReports, postTripReport, deleteTripReport, updateTripReport } from '../actions/tripReportActions'
import { openPostModal, closePostModal, openUpdatePostModal, openCountryModal, closeCountryModal, openConfirmDeleteModal, closeConfirmDeleteModal } from '../actions/modalActions'
import { DotLoader } from 'react-spinners'
import Button from '@material-ui/core/Button'

class Post extends Component {

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
    let countries =[];
    // e.target.value must be converted into an array of numbers.
    for (let i = 0, l = e.target.countries.value.length; i < l; i++) {
      // It contains commas, which must be removed.
      if (!isNaN(Number(e.target.countries.value[i]))){
        countries.push(Number(e.target.countries.value[i]));
      }
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
    let countries =[];
    // e.target.value must be converted into an array of numbers.
    for (let i = 0, l = e.target.countries.value.length; i < l; i++) {
      // It contains commas, which must be removed.
      if (!isNaN(Number(e.target.countries.value[i]))){
        countries.push(Number(e.target.countries.value[i]));
      }
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

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    const listTripReports = this.props.tripReports.map(tripReport =>(
      <div key={tripReport.id} className='trip-report'>
        <TripReport {...tripReport} openCountryModal={this.props.openCountryModal} />
        <Button variant="contained" color="primary" onClick={() => this.props.openUpdatePostModal(tripReport)}>Update</Button>
        <Button variant='outlined' color="secondary" onClick={() => this.props.openConfirmDeleteModal(tripReport)}>Delete</Button>
      </div>
    ));

    return(
      <div className="content">
        {errorMessage}
        <PostModal {...this.props} handlePostSubmit={this.handlePostSubmit} handleUpdateSubmit={this.handleUpdateSubmit} errorMessage={this.errorMessage}/>
        <CountryModal {...this.props} />
        <ConfirmDeleteModal {...this.props} />
        <Button variant="contained" color="primary" className="btn btn-primary" onClick={this.props.openPostModal}>New Trip Report</Button><br/>
        {this.props.fetchingTripReports && <div><DotLoader size={50} color={'#2196f3'} className="content" /></div>}
        {this.props.fetchedTripReports && <div>{listTripReports}</div>}
      </div>
    );
  }
}

const mapState = state => {
  return {
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
    showConfirmDeleteModal: state.modal.showConfirmDeleteModal
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
    closeConfirmDeleteModal
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Post);

Post.propTypes = {
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
  closeConfirmDeleteModal: PropTypes.func
};

//this.props.updateTripReport(tripReport.id, this.props.username, tripReport.title, tripReport.content, tripReport.countries)
