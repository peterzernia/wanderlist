import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchSingleUser } from '../actions/userActions'
import { fetchUserTripReports, fetchNextUserTripReports } from '../actions/tripReportActions'
import { removeError } from '../actions/errorActions'
import { toggleFavorite } from '../actions/favoriteActions'
import { openCopyLinkModal, closeCopyLinkModal } from '../actions/modalActions'
import { openCountryModal, closeCountryModal } from '../actions/modalActions'
import { openTripReportModal, closeTripReportModal } from '../actions/modalActions'
import { openNotAuthModal, closeNotAuthModal } from '../actions/modalActions'

import CountryModal from '../components/CountryModal'
import CopyLinkModal from '../components/CopyLinkModal'
import GoogleMap from '../components/GoogleMap'
import NotAuthModal from '../components/NotAuthModal'
import TripReportModal from '../components/TripReportModal'
import TripReportThumbnail from '../components/TripReportThumbnail'

import Avatar from '@material-ui/core/Avatar'
import { DotLoader } from 'react-spinners'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

/*
This container displays the same information as EditProfile, but does not allow
the person visiting this page to edit or post new content. Since this route is
not a private route, it allows users to have a link to their profile to share
outside of this website.
*/
export class ViewProfile extends Component {

  // Returns True if the user has scrolled past the bottom.
  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  // Adds event listener that checks for scrolling.
  componentDidMount() {
    const { username } = this.props.match.params;
    this.props.fetchSingleUser(username);
    this.props.fetchUserTripReports(username);
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    this.props.removeError();
    document.removeEventListener('scroll', this.onScroll);
  }

  /*
  If the user has scrolled to the bottom, AND there is next URL to load more
  Trip Reports, AND the next Trip Reports are not already being fetched, the
  next Trip Reports will be fetched i.e. infinite scrolling.
  */
  onScroll = () => {
    const element = document.getElementById('scroll');
    if (this.isBottom(element) && this.props.next && !this.props.fetchingUserNext & !this.props.fetchingTripReports) {
      this.props.fetchNextUserTripReports(this.props.next);
    }
  };

  handleClick = (e) => {
    e.preventDefault();
    this.props.toggleFavorite(e.currentTarget.id);
  }

  render() {

    let listTripReports = null;
    if (this.props.tripReports){
      listTripReports = this.props.tripReports.map(tripReport =>(
        <Grid item key={tripReport.id}>
          <TripReportThumbnail tripReport={tripReport} {...this.props} />
        </Grid>
      ));
    }

    return (
      <div id='scroll' className='content'>
        <CopyLinkModal {...this.props} />
        <NotAuthModal {...this.props} />
        {this.props.fetched && <CountryModal {...this.props} />}
        {this.props.modalPost.author && <TripReportModal handleClick={this.handleClick} {...this.props} />}

        {/* This section is the user avatar, username, biography, etc. */}
        <div className='wrap' style={{ marginBottom: 60 }} >
          <div className='left' style={{ width: '37%' }}>
            {this.props.user.home && <Avatar style={{ width: 150, height: 150, margin: '0 auto' }} src={this.props.user.home.flag}/>}
          </div>
          <div className='right' style={{textAlign: 'left', width: '63%', padding: 10 }}>
            <div style={{ height: 40 }}>
            <Typography variant="h4" gutterBottom>
              {this.props.user.username}
            </Typography>
            </div><br/>
            <div style={{ height: 40 }}>
              {`${process.env.REACT_APP_API_URL}${this.props.match.url}`}
            </div><br/>
            <div style={{ height: 40, maxWidth: '75%' }}>
              {this.props.user.biography}
            </div>
          </div>
        </div>
        {this.props.fetched && <hr style={{width: '85%', size: 1}}/>}

        {/* This section is the user map */}
        {this.props.fetched && <GoogleMap {...this.props}/>}
        {this.props.fetched && <hr style={{width: '85%', size: 1}}/>}

        {/* This section is the user posts */}
        <div style={{marginTop: 50}}>
          {this.props.fetchingTripReports && <div><DotLoader size={50} color={'#2196f3'} className="content" /></div>}
          {this.props.fetchedTripReports && <Grid container spacing={24} justify='center' >{listTripReports}</Grid>}
          <div style={{ height: 15 }}/>
          {this.props.fetchingUserNext && <DotLoader size={50} color={'#2196f3'} className="content" />}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    pk: state.user.user.pk,
    authenticated: state.auth.authenticated,
    fetched: state.user.fetchedSingleUser,
    user: state.user.singleUser,
    modalCountry: state.modal.modalCountry,
    userCountries: state.user.singleUser.countries,
    showCountryModal: state.modal.showCountryModal,
    modalPost: state.modal.modalPost,
    showTripReportModal: state.modal.showTripReportModal,
    fetchingTripReports: state.tripReport.fetchingTripReports,
    fetchedTripReports: state.tripReport.fetchedTripReports,
    fetchingUserNext: state.tripReport.fetchingUserNext,
    tripReports: state.tripReport.userTripReports.results,
    next: state.tripReport.userTripReports.next,
    showNotAuthModal: state.modal.showNotAuthModal,
    showCopyLinkModal: state.modal.showCopyLinkModal,
    modalLink: state.modal.modalLink,
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    removeError,
    fetchSingleUser,
    fetchUserTripReports,
    fetchNextUserTripReports,
    openCountryModal,
    closeCountryModal,
    openTripReportModal,
    closeTripReportModal,
    toggleFavorite,
    openNotAuthModal,
    closeNotAuthModal,
    openCopyLinkModal,
    closeCopyLinkModal,
  }, dispatch);
}

export default connect(mapState, mapDispatch)(ViewProfile);

ViewProfile.propTypes = {
  pk: PropTypes.number,
  authenticated: PropTypes.bool,
  fetched: PropTypes.bool,
  user: PropTypes.object,
  modalCountry: PropTypes.object,
  showCountryModal: PropTypes.bool,
  modalPost: PropTypes.object,
  showTripReportModal: PropTypes.bool,
  fetchedTripReports: PropTypes.bool,
  fetchingTripReports: PropTypes.bool,
  fetchingUserNext: PropTypes.bool,
  tripReports: PropTypes.array,
  next: PropTypes.string,
  showNotAuthModal: PropTypes.bool,
  showCopyLinkModal: PropTypes.bool,
  modalLink: PropTypes.string,

  removeError: PropTypes.func,
  fetchSingleUser: PropTypes.func,
  fetchUserTripReports: PropTypes.func,
  fetchNextUserTripReports: PropTypes.func,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
  openTripReportModal: PropTypes.func,
  closeTripReportModal: PropTypes.func,
  toggleFavorite: PropTypes.func,
  openNotAuthModal: PropTypes.func,
  closeNotAuthModal: PropTypes.func,
  openCopyLinkModal: PropTypes.func,
  closeCopyLinkModal: PropTypes.func,
};
