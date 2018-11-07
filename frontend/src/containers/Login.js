import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'
import { connect } from 'react-redux'

class Login extends Component {
  onSubmit = (e) => {
    e.preventDefault();
  }
  render(){
    return(
      <div className="content">
        <LoginForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapState= state => {
  return {};
}

const mapDispatch = dispatch => {
  return {};
}

const LoginContainer = connect(mapState, mapDispatch)(Login);
export default LoginContainer;
