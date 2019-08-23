import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { bool, func } from 'prop-types'
import { Redirect } from 'react-router-dom'

import { authRegister } from '../actions/authActions'
import { removeError } from '../actions/errorActions'

import RegistrationForm from '../components/RegistrationForm'

export function Register(props) {
  const { authenticated } = props

  const handleSubmit = (e) => {
    e.preventDefault()

    const country = e.target.country.value && Number(e.target.country.value)

    props.authRegister(
      e.target.username.value,
      e.target.email.value,
      e.target.password1.value,
      e.target.password2.value,
      country,
    )
    e.target.password1.value = ''
    e.target.password2.value = ''
  }

  return (
    <div className="content">
      {
      !authenticated
      ? <RegistrationForm handleSubmit={handleSubmit} {...props} />
      : <Redirect to={{ pathname: '/' }} />
    }
    </div>
  )
}

const mapState = (state) => ({
    authenticating: state.auth.authenticating,
    authenticated: state.auth.authenticated,
  })

const mapDispatch = (dispatch) => bindActionCreators({
    authRegister,
    removeError,
  }, dispatch)

export default connect(mapState, mapDispatch)(Register)

Register.propTypes = {
  authenticating: bool.isRequired,
  authenticated: bool.isRequired,
  authRegister: func.isRequired,
}
