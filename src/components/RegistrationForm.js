import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const RegistrationForm = (props) => (
  <div className='form-inline'>
    <form onSubmit={props.handleSubmit}>
      <TextField className="user-auth" type='text' name="username" placeholder="Username"/><br/>
      <TextField className="user-auth" type='text' name="email" placeholder="Email"/><br/>
      <TextField className="user-auth" type='password' name="password1" placeholder="Password"/><br/>
      <TextField className="user-auth" type='password' name="password2" placeholder="Confirm Password"/><br/>
      <Button variant="contained" color="primary" type="submit">Register</Button>
      <Link className="btn" to="/login">Cancel</Link>
    </form>
  </div>
);

export default RegistrationForm;
