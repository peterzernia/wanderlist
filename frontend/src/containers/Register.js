import React, { Component } from 'react'
import RegistrationForm from '../components/RegistrationForm'

class Register extends Component {
  onSubmit = (e) => {
    e.preventDefault();
  }
  render(){
    return(
      <div className="content">
        <RegistrationForm onSubmit={this.onSubmit}/>
      </div>
    );
  }
}

export default Register;
