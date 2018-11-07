import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class RegistrationForm extends Component {
  render(){
    return(
        <div className='form-inline'>
          <form onSubmit={this}>
            <h4>Register</h4><br/>
            <input className="form-control user-auth" type='text' name="username" placeholder="username"/>
            <input className="form-control user-auth" type='text' name="email" placeholder="email"/><br/>
            <input className="form-control user-auth" type='password' name="password" placeholder="password"/><br/>
            <input className="form-control user-auth" type='password' name="password" placeholder="password"/><br/>
            <button className="btn btn-primary user-auth-btn" type="submit">Register</button>
            <Link className="btn" to="/login">Cancel</Link>
          </form>
        </div>
    )
  }
}

export default RegistrationForm;
