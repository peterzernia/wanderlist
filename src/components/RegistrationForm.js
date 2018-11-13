import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const RegistrationForm = (props) => (
  <div>
    <div className='form-inline'>
      <form onSubmit={props.handleSubmit}>
        <input className="form-control user-auth" type='text' name="username" placeholder="Username"/><br/>
        <input className="form-control user-auth" type='text' name="email" placeholder="Email"/><br/>
        <input className="form-control user-auth" type='password' name="password1" placeholder="Password"/><br/>
        <input className="form-control user-auth" type='password' name="password2" placeholder="Confirm Password"/><br/>
        <Button variant="contained" color="primary" type="submit">Register</Button>
        <Link className="btn" to="/login">Cancel</Link>
      </form>
    </div>
  </div>
);

export default RegistrationForm;
