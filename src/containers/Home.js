import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { removeError } from '../actions/errorActions'
import Typography from '@material-ui/core/Typography'
import { DotLoader } from 'react-spinners'
import TripReportTruncated from '../components/TripReportTruncated'

class Home extends Component {

  componentWillUnmount() {
    this.props.removeError();
  }

  render(){

    let listTripReports = null;
    if (this.props.tripReports){
      listTripReports = this.props.tripReports.map(tripReport =>(
        <div key={tripReport.id} style={{ marginBottom: 20 }}>
          <TripReportTruncated {...tripReport} openCountryModal={this.props.openCountryModal}/>
        </div>
      ));
    }

    return(
      <div >
        <div className='header-img'>
          <Typography variant="h2" gutterBottom style={{ color: 'white', paddingTop: 200 }}>
            Connect, learn and share
          </Typography>
        </div>
        <div className="home-page" style={{ height: 400 }}>
          <h1 style={{ padding: 50 }}>
            "Countries is a slow social media platform, or 'slocial media'. The
            focus of Countries is to encourage users to write thoughtful jouralism
            with an emphasis on photography. We encourage users to slow down and
            spend time creating their Trip Reports. Users can connect with new people
            both across the world and close to home to find inspiration and wonder in
            traveling and the world around us."
          </h1>
        </div>
        <div className='content' style={{ height: 400, margin: '0 auto' }}>
          {
            this.props.tripReports
            ? <div>{listTripReports[0]}</div>
            : <DotLoader size={50} color={'#2196f3'} className="content" />
          }
        </div>
        <div style={{ height: 400 }}>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    tripReports: state.tripReport.tripReports.results,
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    removeError
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Home);

Home.propTypes = {
  tripReport: PropTypes.array,
  removeError: PropTypes.func
};
