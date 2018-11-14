import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProfileModal from '../components/ProfileModal'
import { openProfileModal, closeProfileModal } from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { fetchCountry } from '../actions/countryActions'
import Button from '@material-ui/core/Button'

class Profile extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    let userCountryList = this.props.userCountries.map(country => country.id);
    this.props.putUserData(
      e.target.username.value,
      e.target.email.value,
      userCountryList,
      Number(e.target.country.value)
    );
    this.props.closeProfileModal();
  }

  render(){

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    return(
      <div className="content">
        {errorMessage}
        <h1>{this.props.user.username}</h1>
        {this.props.user.home && <img className='flag' style={{width: 300}} sizes='150px' src={this.props.user.home.flag} alt=""/>}
        <br/><br/>
        <ProfileModal handleSubmit={this.handleSubmit} {...this.props} errorMessage={this.errorMessage}/>
        <Button variant="contained" color="primary" onClick={() => this.props.openProfileModal(this.props.user)}>Edit Profile</Button>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.user,
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
  userCountries: PropTypes.array,
  searchedCountry: PropTypes.array,
  showProfileModal: PropTypes.bool,
  modalProfile: PropTypes.object,
  fetchCountry: PropTypes.func,
  putUserData: PropTypes.func,
  openProfileModal: PropTypes.func,
  closeProfileModal: PropTypes.func
};
