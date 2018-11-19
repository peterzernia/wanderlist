import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GoogleMap from '../components/GoogleMap'
import ProfileModal from '../components/ProfileModal'
import { openProfileModal, closeProfileModal } from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { fetchCountry } from '../actions/countryActions'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import CountryModal from '../components/CountryModal'
import { openCountryModal, closeCountryModal } from '../actions/modalActions'

class Profile extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    let userCountryList = this.props.userCountries.map(country => country.id);
    this.props.putUserData(
      e.target.username.value,
      e.target.email.value,
      userCountryList,
      Number(e.target.country.value),
      e.target.biography.value
    );
    this.props.closeProfileModal();
  }

  render(){
    return(
      <div className='content'>
        <CountryModal {...this.props} />
        <ProfileModal handleSubmit={this.handleSubmit} {...this.props} />
        <div className='wrap' style={{ marginBottom: 60 }} >
          <div className='left' style={{ width: '37%' }}>
            {this.props.user.home && <Avatar style={{ width: 150, height: 150, margin: '0 auto' }} src={this.props.user.home.flag}/>}
          </div>
          <div className='right' style={{textAlign: 'left', width: '63%', padding: 10 }}>
            <div style={{ height: 30 }}>
            <Typography variant="h4" gutterBottom>
              {this.props.user.username}
            </Typography>
            </div><br/>
            <div style={{ height: 30 }}>
              <Button size='small' variant='outlined' onClick={() => this.props.openProfileModal(this.props.user)}>
                Edit Profile
              </Button>
            </div><br/>
            <div style={{ height: 30, maxWidth: '75%' }}>
              {this.props.biography}
            </div>
          </div>
        </div>
        <hr style={{width: '85%', size: 1}}/>
        <GoogleMap {...this.props}/>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    biography: state.user.user.biography,
    searchedCountry: state.country.country,
    showProfileModal: state.modal.showProfileModal,
    modalProfile: state.modal.modalProfile,
    userCountries: state.user.user.countries,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    fetchCountry,
    putUserData,
    openProfileModal,
    closeProfileModal,
    openCountryModal,
    closeCountryModal
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Profile);

Profile.propTypes = {
  user: PropTypes.object,
  biography: PropTypes.string,
  searchedCountry: PropTypes.array,
  showProfileModal: PropTypes.bool,
  modalProfile: PropTypes.object,
  userCountries: PropTypes.array,
  showCountryModal: PropTypes.bool,
  modalCountry: PropTypes.object,
  fetchCountry: PropTypes.func,
  putUserData: PropTypes.func,
  openProfileModal: PropTypes.func,
  closeProfileModal: PropTypes.func,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func
};
