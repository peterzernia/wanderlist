import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { bool, func, shape } from 'prop-types'
import { Redirect } from 'react-router-dom'

import { authLogin } from '../actions/authActions'
import { removeError } from '../actions/errorActions'

import LoginForm from '../components/LoginForm'

export function Login(props) {
  // Authenticates the user.
  const handleSubmit = (e) => {
    e.preventDefault()
    props.authLogin(e.target.username.value, e.target.password.value)
  }

  return (
    <div className="content">
      {
        !props.authenticated
        ? <LoginForm handleSubmit={handleSubmit} {...props} />
        : <Redirect to={props.location.state ? props.location.state.from.pathname : '/'} />
      }
    </div>
  )
}

const mapState = (state) => ({
    authenticating: state.auth.authenticating,
    authenticated: state.auth.authenticated,
  })

const mapDispatch = (dispatch) => bindActionCreators({
    authLogin,
    removeError,
  }, dispatch)

export default connect(mapState, mapDispatch)(Login)

Login.propTypes = {
  authenticating: bool.isRequired,
  authenticated: bool.isRequired,
  authLogin: func.isRequired,
  location: shape({}),
}

Login.defaultProps = {
  location: {},
}
