import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ProfileModal from '../components/ProfileModal'
import { openProfileModal, closeProfileModal } from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { fetchCountry } from '../actions/countryActions'


class Profile extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      e.target.username.value,
      this.props.userCountries,
      e.target.email.value,
    );
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
        <br/>
        <ProfileModal handleSubmit={this.handleSubmit} {...this.props} errorMessage={this.errorMessage}/>
        <button className="btn btn-primary" onClick={() => this.props.openProfileModal(this.props.user)}>EditProfile</button>
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
  return {
    fetchCountry: (query) => dispatch(fetchCountry(query)),
    putUserData: (username, email, countries, home_country) => dispatch(putUserData(username, email, countries,home_country)),
    openProfileModal: (user) => dispatch(openProfileModal(user)),
    closeProfileModal: () => dispatch(closeProfileModal())
  };
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
