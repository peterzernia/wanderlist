import React from 'react'
import { func } from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

const LoginForm = ({ handleSubmit }) => (
  <Card style={{ maxWidth: 400, margin: '0 auto'}}>
    <CardHeader title="Login"/>
    <CardContent>
      <form onSubmit={handleSubmit}>
        <TextField className="user-auth" type='text' name="username" label="Username" required/><br/>
        <TextField className="user-auth" type='password' name="password" label="Password" required/><br/><br/>
        <Button variant="contained" color="primary" type="submit">Login</Button>
        <Link to="/register"><Button>Register</Button></Link><br/><br/>
        <Link style={{ textDecoration: 'none', color: 'black' }} to="/password-reset">Forgot Password?</Link>
      </form>
    </CardContent>
  </Card>
);

export default LoginForm;

LoginForm.propTypes = {
  handleSubmit: func
}