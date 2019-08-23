import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { func } from 'prop-types'
import { authLogout } from '../actions/authActions'

export function Logout(props) {
  useEffect(() => {
    function logout() {
      props.authLogout()
    }
    logout()
  }, [props, props.authLogout])

    return (
      <div className="content">
        You have been logged out.
      </div>
    )
}

const mapState = () => ({
  })

const mapDispatch = (dispatch) => bindActionCreators({
    authLogout,
  }, dispatch)

export default connect(mapState, mapDispatch)(Logout)

Logout.propTypes = {
  authLogout: func.isRequired,
}
