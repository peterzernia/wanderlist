import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ForgotPasswordForm from '../components/ForgotPasswordForm'
import { requestPasswordReset } from '../actions/authActions'

class ForgotPassword extends Component{

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
