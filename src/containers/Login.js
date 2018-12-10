import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { authLogin } from '../actions/authActions'
import { removeError } from '../actions/errorActions'

import LoginForm from '../components/LoginForm'

export class Login extends Component {

  componentWillUnmount() {
    this.props.removeError();
  }

  // Authenticates the user.
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.authLogin(e.target.username.value, e.target.password.value);
  }

  render(){
    return(
      <div className="content">
        {
          !this.props.authenticated
          ? <LoginForm handleSubmit={this.handleSubmit} {...this.props} />
          : <Redirect to={{pathname: "/",}} />
        }
      </div>
    );
  }
}

const mapState = state => {
  return {
    authenticating: state.auth.authenticating,
    authenticated: state.auth.authenticated,
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    authLogin,
    removeError
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Login);

Login.propTypes = {
  authenticating: PropTypes.bool,
  authenticated: PropTypes.bool,
  authLogin: PropTypes.func
};
