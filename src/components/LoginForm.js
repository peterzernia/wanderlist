import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

const LoginForm = (props) => (
  <Card style={{ maxWidth: 400, margin: '0 auto'}}>
    <CardHeader title="Login"/>
    <CardContent>
      <form onSubmit={props.handleSubmit}>
        <TextField className="user-auth" type='text' name="username" label="Username"/><br/>
        <TextField className="user-auth" type='password' name="password" label="Password"/><br/><br/>
        <Button variant="contained" color="primary" type="submit">Login</Button>
        <Link to="/register"><Button>Register</Button></Link>
        <Link to="/password_reset"><Button>Forgot Password?</Button></Link>
      </form>
    </CardContent>
  </Card>
);

export default LoginForm;
