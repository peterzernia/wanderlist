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
    return(
      <div className="content">
        <h1>Home</h1>
        {
          this.props.fetching
          ? <DotLoader size={50} color={'#007bff'} className="content" />
          : null
        }
        {
          this.props.fetched
          ? <TripReport {...this.props}/>
          : null
        }
      </div>
    );
  }
}

const mapState = state => {
  return {
    fetched: state.tripReport.fetched,
    fetching: state.tripReport.fetching
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
  fetchTripReports: PropTypes.func
};
