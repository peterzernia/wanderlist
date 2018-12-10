import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { requestPasswordReset } from '../actions/authActions'

import ForgotPasswordForm from '../components/ForgotPasswordForm'

/*
POSTS an email address to the Django backend, which handles sending an email
with a url to set a new password for the user.
*/
export class ForgotPassword extends Component{

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.requestPasswordReset(e.target.email.value);
    e.target.email.value = "";
  }

  render() {
    return (
      <div className='content'>
        <ForgotPasswordForm handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

const mapState = state => {
  return {
    success: state.error.success,
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    requestPasswordReset,
  }, dispatch)
}

export default connect(mapState, mapDispatch)(ForgotPassword);

ForgotPassword.propTypes = {
  requestPasswordReset: PropTypes.func,
  success: PropTypes.string
};
