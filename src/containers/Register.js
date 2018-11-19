import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom';
import RegistrationForm from '../components/RegistrationForm'
import { connect } from 'react-redux'
import { authRegister } from '../actions/authActions'
import { removeError } from '../actions/errorActions'

class Register extends Component {

  componentWillUnmount() {
    this.props.removeError();
  }

  // Registers the user.
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
  }
  render(){
    return(
      // If the user is authenticated on the Register page, it will redirect to
      // the home page.
      <div className="content">
      {
        !this.props.authenticated
        ? <RegistrationForm handleSubmit={this.handleSubmit} {...this.props}/>
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
    authRegister,
    removeError
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Register);

Register.propTypes = {
  authenticating: PropTypes.bool,
  authenticated: PropTypes.bool,
  authRegister: PropTypes.func
};
