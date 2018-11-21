import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { removeError } from '../actions/errorActions'
import Typography from '@material-ui/core/Typography'

class Home extends Component {

  componentWillUnmount() {
    this.props.removeError();
  }

  render(){

    return(
      <div className="">
        <div className='header-img'>
          <Typography variant="h3" gutterBottom style={{ color: 'white', paddingTop: 200 }}>
            Connect, learn and share
          </Typography>
        </div>
        <div style={{ height: 400 }}>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    removeError
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Home);

Home.propTypes = {
  fetched: PropTypes.bool,
  fetching: PropTypes.bool,
  tripReports: PropTypes.array,
  showCountryModal: PropTypes.bool,
  modalCountry: PropTypes.object,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
  removeError: PropTypes.func
};
