import React, { Component } from 'react'
import RegistrationForm from '../components/RegistrationForm'
import { connect } from 'react-redux'
import { authRegister } from '../actions/authActions'

class Register extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.authRegister(
      e.target.username.value,
      e.target.email.value,
      e.target.password1.value,
      e.target.password2.value
    );
    this.props.history.push('/');
  }
  render(){
    return(
      <div className="content">
        <RegistrationForm onSubmit={this.handleSubmit}/>
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
    authRegister: (username, email, password1, password2) => dispatch(authRegister(username, email, password1, password2))
  };
}

export default connect(mapState, mapDispatch)(Register);
