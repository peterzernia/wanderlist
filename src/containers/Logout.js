import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { authLogout } from '../actions/authActions'

class Logout extends Component {

  componentWillMount() {
    this.props.authLogout();
  }

  render() {
    return(
      <div className="content">
        You have been logged out.
      </div>
    )
  }
};

const mapState = state => {
  return {
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    authLogout,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(Logout);

Logout.propTypes = {
  authLogout: PropTypes.func
};
