import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostModal from '../components/PostModal'
import TripReport from '../components/TripReport'
import { fetchUserTripReports } from '../actions/userActions'
import { postTripReport } from '../actions/tripReportActions'
import { openPostModal, closePostModal } from '../actions/modalActions'
import { DotLoader } from 'react-spinners';

class Post extends Component {

  componentDidMount() {
    this.props.fetchUserTripReports(this.props.username);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var options = e.target.countries.options;
    var countries =[];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        countries.push(options[i].value);
      }
    }
    this.props.postTripReport(
      this.props.username,
      e.target.title.value,
      e.target.content.value,
      countries
    );
    this.props.closePostModal();
  }

  render(){

    const listTripReports = this.props.tripReports.map((tripReport, i) =>(
      <TripReport key={i} {...tripReport} />
    ));

    return(
      <div className="content">
        <PostModal {...this.props} handleSubmit={this.handleSubmit} />
        <button className="btn btn-primary" onClick={this.props.openPostModal}>New Post</button>
        {
          this.props.fetchingTripReports
          ? <DotLoader size={50} color={'#007bff'} className="content" />
          : null
        }
        {
          this.props.fetchedTripReports
          ? <div>{listTripReports}</div>
          : null
        }
      </div>
    );
  }
}

const mapState = state => {
  return {
    error: state.tripReport.error,
    username: state.user.user.username,
    showPostModal: state.modal.showPostModal,
    fetchingTripReports: state.user.fetchingTripReports,
    fetchedTripReports: state.user.fetchedTripReports,
    tripReports: state.user.tripReports
  };
}

const mapDispatch = dispatch => {
  return {
    fetchUserTripReports: (username) => dispatch(fetchUserTripReports(username)),
    postTripReport: (title, content, author, countries) => dispatch(postTripReport(title, content, author, countries)),
    openPostModal: () => dispatch(openPostModal()),
    closePostModal: () => dispatch(closePostModal())
  };
}

export default connect(mapState, mapDispatch)(Post);

Post.propTypes = {
  error: PropTypes.object,
  username: PropTypes.string,
  showPostModal: PropTypes.bool,
  fetchingTripReports: PropTypes.bool,
  fetchedTripReports: PropTypes.bool,
  tripReports: PropTypes.array,
  fetchUserTripReports: PropTypes.func,
  postTripReport: PropTypes.func,
  openPostModal: PropTypes.func,
  closePostModal: PropTypes.func
};
