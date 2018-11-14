import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import TripReport from '../components/TripReport'
import { DotLoader } from 'react-spinners';

class Home extends Component {

  render(){

    const listTripReports = this.props.tripReports.map(tripReport =>(
      <div key={tripReport.id} className='trip-report'>
        <TripReport {...tripReport} />
      </div>
    ));

    return(
      <div className="content">
        {this.props.fetching && <DotLoader size={50} color={'#66bb6a'} className="content" />}
        {this.props.fetched && <div>{listTripReports}</div>}
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
  };
}

export default connect(mapState, mapDispatch)(Home);

Home.propTypes = {
  fetched: PropTypes.bool,
  fetching: PropTypes.bool,
  tripReports: PropTypes.array,
};
