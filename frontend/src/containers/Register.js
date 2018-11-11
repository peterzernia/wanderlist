import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RegistrationForm from '../components/RegistrationForm'
import { connect } from 'react-redux'
import { authRegister } from '../actions/authActions'

class Register extends Component {

  /*
  Registers and authenticates the user, and redirects to homepage.
  */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.authRegister(
      e.target.username.value,
      e.target.email.value,
      e.target.password1.value,
      e.target.password2.value
    );
    if (this.props.authenticated){
      this.props.history.push('/');
    }
  }
  render(){
    return(
      <div className="content">
        <RegistrationForm onSubmit={this.handleSubmit} {...this.props}/>
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

Register.propTypes = {
  authenticating: PropTypes.bool,
  authenticated: PropTypes.bool,
  error: PropTypes.object,
  authRegister: PropTypes.func
};
