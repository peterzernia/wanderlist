import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TripReportForm from '../components/TripReportForm'
import { postTripReport } from '../actions/tripReportActions'

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
    )
  }

  render(){
    return(
      <div className="content">
        <h1>Post</h1>
        <TripReportForm handleSubmit={this.handleSubmit} {...this.props} />
      </div>
    );
  }
}

const mapState = state => {
  return {
    error: state.tripReport.error,
    username: state.user.user.username,
  };
}

const mapDispatch = dispatch => {
  return {
    postTripReport: (title, content, author, countries) => dispatch(postTripReport(title, content, author, countries))
  };
}

export default connect(mapState, mapDispatch)(Post);

Post.propTypes = {
  error: PropTypes.object,
  pk: PropTypes.string,
};
