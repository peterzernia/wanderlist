import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'

import { fetchSlugTripReports } from '../actions/tripReportActions'
import { openCountryModal, closeCountryModal } from '../actions/modalActions'
import { removeError } from '../actions/errorActions'
import { toggleFavorite } from '../actions/favoriteActions'

import CountryModal from '../components/CountryModal'
import TripReport from '../components/TripReport'

import { DotLoader } from 'react-spinners'

/*
This component creates a link off the posts slug, so that users can share and
access posts externally.
*/
class Post extends Component {

  componentDidMount () {
    const { slug } = this.props.match.params
    this.props.fetchSlugTripReports(slug);
  }

  componentWillUnmount() {
    this.props.removeError();
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.toggleFavorite(e.currentTarget.id);
  }

  render(){

    let listTripReport = null;
    if (this.props.tripReports){
      listTripReport = this.props.tripReports.map(tripReport =>(
        <div key={tripReport.id} style={{ marginBottom: 20 }}>
          <TripReport handleClick={this.handleClick} {...tripReport} {...this.props} openCountryModal={this.props.openCountryModal}/>
        </div>
      ));
    }

    return(
      <div className="content">
        {this.props.fetching && <div className='centered'><DotLoader size={50} color={'#2196f3'} className="content" /></div>}
        {this.props.fetched && <CountryModal {...this.props} />}
        {this.props.fetched && <div>{listTripReport}</div>}
      </div>
    );
  }
}

const mapState = state => {
  return {
    pk: state.user.user.pk,
    tripReports: state.tripReport.slugTripReports.results,
    fetched: state.tripReport.fetchedSlugTripReports,
    fetching: state.tripReport.fetchingSlugTripReports,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    fetchSlugTripReports,
    removeError,
    openCountryModal,
    closeCountryModal,
    toggleFavorite,
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Post);

Post.propTypes = {
  pk: PropTypes.number,
  tripReport: PropTypes.array,
  fetched: PropTypes.bool,
  showCountryModal: PropTypes.bool,
  modalCountry: PropTypes.object,
  fetchSlugTripReports: PropTypes.func,
  removeError: PropTypes.func,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
  toggleFavorite: PropTypes.func,
};
