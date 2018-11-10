import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProfileModal from '../components/ProfileModal'
import { openProfileModal, closeProfileModal } from '../actions/modalActions'

class Profile extends Component {
  render(){
    return(
      <div className="content">
        <h1>{this.props.user.username}</h1>
        {
          this.props.user.home_country !== null
          ?<img className="profile-img" width="150" height="150" src={this.props.user.home_country.flag} alt=""/>
          :null
        }
        <br/>
        <ProfileModal {...this.props} />
        <button className="btn btn-primary" onClick={() => this.props.openProfileModal(this.props.user)}>EditProfile</button>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    fetched: state.user.fetched,
    showProfileModal: state.modal.showProfileModal,
    modalProfile: state.modal.modalProfile
  };
}

const mapDispatch = dispatch => {
  return {
    openProfileModal: (user) => dispatch(openProfileModal(user)),
    closeProfileModal: () => dispatch(closeProfileModal())
  };
}

export default connect(mapState, mapDispatch)(Profile);
