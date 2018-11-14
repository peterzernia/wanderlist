import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CountryModal from '../components/CountryModal'
import PostModal from '../components/PostModal'
import TripReport from '../components/TripReport'
import { fetchUserTripReports, postTripReport, deleteTripReport, updateTripReport } from '../actions/tripReportActions'
import { openPostModal, closePostModal, openUpdatePostModal, openCountryModal, closeCountryModal } from '../actions/modalActions'
import { DotLoader } from 'react-spinners'
import Button from '@material-ui/core/Button'

class Post extends Component {

  componentDidMount() {
    this.props.fetchUserTripReports(this.props.username);
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
    var options = e.target.countries.options;
    var countries =[];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        countries.push(options[i].value);
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
    var options = e.target.countries.options;
    var countries =[];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        countries.push(options[i].value);
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
        <Button variant="contained" color="secondary" onClick={() => {if(window.confirm('Delete the post?')) {this.props.deleteTripReport(tripReport.id)};}}>Delete</Button>
      </div>
    ));

    return(
      <div className="content">
        {errorMessage}
        <PostModal {...this.props} handlePostSubmit={this.handlePostSubmit} handleUpdateSubmit={this.handleUpdateSubmit} errorMessage={this.errorMessage}/>
        <CountryModal {...this.props} />
        <Button variant="contained" color="primary" className="btn btn-primary" onClick={this.props.openPostModal}>New Trip Report</Button><br/>
        {this.props.fetchingTripReports && <div><DotLoader size={50} color={'#66bb6a'} className="content" /></div>}
        {this.props.fetchedTripReports && <div>{listTripReports}</div>}
      </div>
    );
  }
}

const mapState = state => {
  return {
    error: state.tripReport.error,
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
    closeCountryModal
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Post);

Post.propTypes = {
  error: PropTypes.object,
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
  fetchUserTripReports: PropTypes.func,
  postTripReport: PropTypes.func,
  deleteTripReport: PropTypes.func,
  updateTripReport: PropTypes.func,
  openPostModal: PropTypes.func,
  closePostModal: PropTypes.func,
  openUpdatePostModal: PropTypes.func,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func
};

//this.props.updateTripReport(tripReport.id, this.props.username, tripReport.title, tripReport.content, tripReport.countries)
