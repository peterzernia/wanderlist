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
    let country;
    // Js tries to convert empty string to 0 with Number, this prevents that,
    // which POSTs an empty string instead of 0 to return the correct error
    // if the Home Country field is left blank on registration.
    if (e.target.country.value !== '') {
      country = Number(e.target.country.value)
    }
    this.props.authRegister(
      e.target.username.value,
      e.target.email.value,
      e.target.password1.value,
      e.target.password2.value,
      country
    );
    this.props.history.push('/login');
  }
  render(){
    return(
      <div className="content">
        <RegistrationForm handleSubmit={this.handleSubmit} {...this.props}/>
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
  return {
    authRegister: (username, email, password1, password2, home) => dispatch(authRegister(username, email, password1, password2, home))
  };
}

export default connect(mapState, mapDispatch)(Register);

Register.propTypes = {
  authenticating: PropTypes.bool,
  authenticated: PropTypes.bool,
  error: PropTypes.object,
  authRegister: PropTypes.func
};
