import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import { connect } from 'react-redux'
import { authLogin } from '../actions/authActions'
import { Redirect } from 'react-router-dom';

class Login extends Component {

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
          : <Redirect to={{pathname: "/", }} />
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
