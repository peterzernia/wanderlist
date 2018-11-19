import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Map from './Map'
import ProfileModal from '../components/ProfileModal'
import { openProfileModal, closeProfileModal } from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { fetchCountry } from '../actions/countryActions'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'

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
        <ProfileModal handleSubmit={this.handleSubmit} {...this.props} />
        <div className='wrap' style={{ marginBottom: 60 }} >
          <div className='left' style={{ width: '37%' }}>
            {this.props.user.home && <Avatar style={{ width: 150, height: 150, margin: '0 auto' }} src={this.props.user.home.flag}/>}
          </div>
          <div className='right' style={{textAlign: 'left', width: '63%' }}>
            <div style={{ height: 30 }}>
              <h2>{this.props.user.username}</h2>
            </div><br/>
            <div style={{ height: 30 }}>
              <Button size='small' variant='outlined' onClick={() => this.props.openProfileModal(this.props.user)}>
                Edit Profile
              </Button>
            </div><br/>
            <div style={{ height: 30, maxWidth: '75%' }}>
              <strong>{this.props.biography}</strong>
            </div>
          </div>
        </div>
        <hr style={{width: '85%', size: 1}}/>
        <Map/>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    biography: state.user.user.biography,
    userCountries: state.user.user.countries,
    searchedCountry: state.country.country,
    showProfileModal: state.modal.showProfileModal,
    modalProfile: state.modal.modalProfile
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    fetchCountry,
    putUserData,
    openProfileModal,
    closeProfileModal
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Profile);

Profile.propTypes = {
  user: PropTypes.object,
  biography: PropTypes.string,
  userCountries: PropTypes.array,
  searchedCountry: PropTypes.array,
  showProfileModal: PropTypes.bool,
  modalProfile: PropTypes.object,
  fetchCountry: PropTypes.func,
  putUserData: PropTypes.func,
  openProfileModal: PropTypes.func,
  closeProfileModal: PropTypes.func
};
