import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LoginForm from '../components/LoginForm'
import { connect } from 'react-redux'
import { authLogin } from '../actions/authActions'
import { Redirect } from 'react-router-dom';

class Login extends Component {

  /*
  Authenticates the user, and redirects to homepage.
  */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.authLogin(e.target.username.value, e.target.password.value);
    if (this.props.authenticated){
      this.props.history.push('/');
    }
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
    error: state.auth.error,
  };
}

const mapDispatch = dispatch => {
  return {
    authLogin: (username, password) => dispatch(authLogin(username, password))
  };
}

export default connect(mapState, mapDispatch)(Login);

Login.propTypes = {
  authenticating: PropTypes.bool,
  authenticated: PropTypes.bool,
  error: PropTypes.object,
  authLogin: PropTypes.func
};
