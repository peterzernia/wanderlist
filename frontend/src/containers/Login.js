import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import { authLogin } from '../actions/authActions'
import { removeError } from '../actions/errorActions'

import LoginForm from '../components/LoginForm'

export function Login({ authLogin, authenticated, ...rest }) {
  // Authenticates the user.
  const handleSubmit = (e) => {
    e.preventDefault();
    authLogin(e.target.username.value, e.target.password.value);
  }

  return(
    <div className="content">
      {
        !authenticated
        ? <LoginForm handleSubmit={handleSubmit} {...rest} />
        : <Redirect to={{pathname: "/",}} />
      }
    </div>
  );
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
  authenticating: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  authLogin: PropTypes.func.isRequired,
};
