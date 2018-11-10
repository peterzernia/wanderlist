import React, { Component } from 'react'
import { connect } from 'react-redux'

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
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.user,
    fetched: state.user.fetched
  };
}

const mapDispatch = dispatch => {
  return {
  };
}

export default connect(mapState, mapDispatch)(Profile);
