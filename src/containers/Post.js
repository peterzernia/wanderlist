import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PostModal from '../components/PostModal'
import { postTripReport } from '../actions/tripReportActions'
import { openPostModal, closePostModal } from '../actions/modalActions'

class Post extends Component {

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
    return(
      <div className="content">
        <PostModal {...this.props} handleSubmit={this.handleSubmit} />
        <button className="btn btn-primary" onClick={this.props.openPostModal}>New Post</button>
      </div>
    );
  }
}

const mapState = state => {
  return {
    error: state.tripReport.error,
    username: state.user.user.username,
    showPostModal: state.modal.showPostModal
  };
}

const mapDispatch = dispatch => {
  return {
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
  openPostModal: PropTypes.func,
  closePostModal: PropTypes.func
};
