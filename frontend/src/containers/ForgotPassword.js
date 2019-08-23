import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { func } from 'prop-types'

import { requestPasswordReset } from '../actions/authActions'

import ForgotPasswordForm from '../components/ForgotPasswordForm'

/*
POSTS an email address to the Django backend, which handles sending an email
with a url to set a new password for the user.
*/
export function ForgotPassword(props) {
  const handleSubmit = (e) => {
    e.preventDefault()
    props.requestPasswordReset(e.target.email.value)
    e.target.email.value = ''
  }

    return (
      <div className="content">
        <ForgotPasswordForm handleSubmit={handleSubmit} />
      </div>
    )
}

const mapState = (state) => ({
    success: state.error.success,
  })

const mapDispatch = (dispatch) => bindActionCreators({
    requestPasswordReset,
  }, dispatch)

export default connect(mapState, mapDispatch)(ForgotPassword)

ForgotPassword.propTypes = {
  requestPasswordReset: func.isRequired,
}
