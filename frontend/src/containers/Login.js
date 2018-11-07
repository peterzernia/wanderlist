import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import { connect } from 'react-redux'
import { authLogin } from '../actions/authActions'
import { fetchUser } from '../actions/userActions'

class Login extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.authLogin(e.target.username.value, e.target.password.value);
    this.props.fetchUser()
    this.props.history.push('/');
  }

  render(){
    return(
      <div className="content">
        {
          !this.props.authenticated ?
          <LoginForm handleSubmit={this.handleSubmit} {...this.props} /> :
          <p>You are already logged in</p>
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
    authLogin: (username, password) => dispatch(authLogin(username, password)),
    fetchUser: () => dispatch(fetchUser())
  };
}

export default connect(mapState, mapDispatch)(Login);
