import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import GoogleMap from '../components/GoogleMap'
import EditProfileModal from '../components/EditProfileModal'
import Post from './Post'
import { openEditProfileModal, closeEditProfileModal } from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { fetchCountry } from '../actions/countryActions'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import CountryModal from '../components/CountryModal'
import { openCountryModal, closeCountryModal } from '../actions/modalActions'
import { removeError } from '../actions/errorActions'

class Profile extends Component {

  componentWillUnmount() {
    this.props.removeError();
  }

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
    this.props.closeEditProfileModal();
  }

  render(){
    return(
      <div className='content'>
        {this.props.fetched && <CountryModal {...this.props} />}
        <EditProfileModal handleSubmit={this.handleSubmit} {...this.props} />
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
              <Button size='small' variant='outlined' onClick={() => this.props.openEditProfileModal(this.props.user)}>
                Edit Profile
              </Button>
            </div><br/>
            <div style={{ height: 30, maxWidth: '75%' }}>
              {this.props.biography}
            </div>
          </div>
        </div>
        <hr style={{width: '85%', size: 1}}/>
        {this.props.fetched && <GoogleMap {...this.props}/>}
        <hr style={{width: '85%', size: 1}}/>
        <Post />
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    fetched: state.user.fetched,
    biography: state.user.user.biography,
    searchedCountry: state.country.country,
    showEditProfileModal: state.modal.showEditProfileModal,
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
    openEditProfileModal,
    closeEditProfileModal,
    openCountryModal,
    closeCountryModal,
    removeError
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Profile);

Profile.propTypes = {
  user: PropTypes.object,
  fetched: PropTypes.bool,
  biography: PropTypes.string,
  searchedCountry: PropTypes.array,
  showEditProfileModal: PropTypes.bool,
  modalProfile: PropTypes.object,
  userCountries: PropTypes.array,
  showCountryModal: PropTypes.bool,
  modalCountry: PropTypes.object,
  fetchCountry: PropTypes.func,
  putUserData: PropTypes.func,
  openEditProfileModal: PropTypes.func,
  closeEditProfileModal: PropTypes.func,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
  removeError: PropTypes.func
};
