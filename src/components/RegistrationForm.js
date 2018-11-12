import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class RegistrationForm extends Component {
  render(){

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }

    return(
      <div>
        {errorMessage}
        <div className='form-inline'>
          <form onSubmit={this.props.handleSubmit}>
            <input className="form-control user-auth" type='text' name="username" placeholder="Username"/><br/>
            <input className="form-control user-auth" type='text' name="email" placeholder="Email"/><br/>
            <input className="form-control user-auth" type='password' name="password1" placeholder="Password"/><br/>
            <input className="form-control user-auth" type='password' name="password2" placeholder="Confirm Password"/><br/>
            <button className="btn btn-primary user-auth-btn" type="submit">Register</button>
            <Link className="btn" to="/login">Cancel</Link>
          </form>
        </div>
      </div>
    )
  }
}

export default RegistrationForm;
