import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class LoginForm extends Component {
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
            <input className="form-control user-auth" type='password' name="password" placeholder="Password"/><br/>
            <button className="btn btn-primary user-auth-btn" type="submit">Login</button>
            <Link className="btn" to="/register">Register</Link>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm;
