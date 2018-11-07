import React, { Component } from 'react'
import { connect } from 'react-redux'

class Profile extends Component {
  render(){
    return(
      <div className="content">
        <h1>Profile</h1>
        {this.props.user.username}<br/>
        {this.props.user.email}
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
