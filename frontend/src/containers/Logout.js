import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { authLogout } from '../actions/authActions'

export function Logout({ authLogout }) {

  useEffect(() => {
    function logout() {
      authLogout()
    }
    logout()
  }, [authLogout])

    return(
      <div className="content">
        You have been logged out.
      </div>
    )
}

const mapState = () => {
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
  authLogout: PropTypes.func.isRequired
};
