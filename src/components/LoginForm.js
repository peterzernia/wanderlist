import React from 'react'
import { Link } from 'react-router-dom'

const LoginForm = (props) => (
  <div>
    <div className='form-inline'>
      <form onSubmit={props.handleSubmit}>
        <input className="form-control user-auth" type='text' name="username" placeholder="Username"/><br/>
        <input className="form-control user-auth" type='password' name="password" placeholder="Password"/><br/>
        <button className="btn btn-primary user-auth-btn" type="submit">Login</button>
        <Link className="btn" to="/register">Register</Link>
      </form>
    </div>
  </div>
);

export default LoginForm;
