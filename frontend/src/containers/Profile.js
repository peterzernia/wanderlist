import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProfileModal from '../components/ProfileModal'
import { openProfileModal, closeProfileModal } from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { fetchCountry } from '../actions/countryActions'


class Profile extends Component {

  componentWillMount() {
    this.props.fetchCountry('')
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var homeCountry = this.props.searchedCountry.filter(country => country.id === +e.target.country.value);
    var flag = homeCountry[0].flag
    console.log(
      e.target.username.value,
      this.props.userCountries,
      e.target.email.value,
      flag
    );
  }

  render(){
    return(
      <div className="content">
        <h1>{this.props.user.username}</h1>
        <br/>
        <ProfileModal handleSubmit={this.handleSubmit} {...this.props} />
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
