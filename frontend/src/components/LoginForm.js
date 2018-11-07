import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class LoginForm extends Component {
  render(){
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }
    return(
      <div className='form-inline'>
        {errorMessage}
        <form onSubmit={this.props.handleSubmit}>
          <h4>Login</h4><br/>
          <input className="form-control user-auth" type='text' name="username" placeholder="username"/>
          <input className="form-control user-auth" type='password' name="password" placeholder="password"/><br/>
          <button className="btn btn-primary user-auth-btn" type="submit">Login</button>
          <Link className="btn" to="/register">Register</Link>
        </form>
      </div>
    )
  }
}

export default LoginForm;
