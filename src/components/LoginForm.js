import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const LoginForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <TextField className="user-auth" type='text' name="username" label="Username"/><br/>
    <TextField className="user-auth" type='password' name="password" label="Password"/><br/><br/>
    <Button variant="contained" color="primary" type="submit">Login</Button>
    <Link to="/register"><Button>Register</Button></Link>
  </form>
);

export default LoginForm;
