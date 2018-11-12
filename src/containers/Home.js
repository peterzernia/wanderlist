import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { fetchTripReports } from '../actions/tripReportActions'
import TripReport from '../components/TripReport'
import { DotLoader } from 'react-spinners';

class Home extends Component {

  componentWillMount() {
    this.props.fetchTripReports()
  }

  render(){

    const listTripReports = this.props.tripReports.map((tripReport, i) =>(
      <TripReport key={i} {...tripReport} />
    ));

    return(
      <div className="content">
        {
          this.props.fetching
          ? <DotLoader size={50} color={'#007bff'} className="content" />
          : null
        }
        {
          this.props.fetched
          ? <div>{listTripReports}</div>
          : null
        }
      </div>
    );
  }
}

const mapState = state => {
  return {
    fetched: state.tripReport.fetched,
    fetching: state.tripReport.fetching,
    tripReports: state.tripReport.tripReports
  };
}

const mapDispatch = dispatch => {
  return {
    fetchTripReports: () => dispatch(fetchTripReports())
  };
}

export default connect(mapState, mapDispatch)(Home);

Home.propTypes = {
  fetched: PropTypes.bool,
  fetching: PropTypes.bool,
  tripReports: PropTypes.array,
  fetchTripReports: PropTypes.func
};
