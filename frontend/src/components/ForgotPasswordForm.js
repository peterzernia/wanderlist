import React from 'react'
import { func } from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

const ForgotPasswordForm = ({ handleSubmit }) => (
  <Card style={{ maxWidth: 400, margin: '0 auto'}}>
    <CardHeader title="Request Password Reset"/>
    <CardContent>
      <form onSubmit={handleSubmit}>
        <TextField className="user-auth" type='text' name="email" label="Email" required/><br/><br/>
        <Button variant="contained" color="primary" type="submit">Submit</Button>
        <Link to="/login"><Button>Cancel</Button></Link>
      </form>
    </CardContent>
  </Card>
);

export default ForgotPasswordForm;

ForgotPasswordForm.propTypes = {
  handleSubmit: func,
}