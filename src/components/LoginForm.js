import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const LoginForm = (props) => (
  <div>
    <div className='form-inline'>
      <form onSubmit={props.handleSubmit}>
        <input className="form-control user-auth" type='text' name="username" placeholder="Username"/><br/>
        <input className="form-control user-auth" type='password' name="password" placeholder="Password"/><br/>
        <Button variant="contained" color="primary" type="submit">Login</Button>
        <Link className="btn" to="/register">Register</Link>
      </form>
    </div>
  </div>
);

export default LoginForm;
