import React, { useState } from 'react'
import { bool, func } from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import countries from '../country_data'
import { DotLoader } from 'react-spinners'

export default function RegistrationForm(props) {
  const [country, setCountry] = useState('')
  const { authenticating, handleSubmit} = props

  const handleChange = event => {
    setCountry(event.target.value)
  };


  /*
  Importing JSON file with all of the country names and pks from the Django
  database. This array is mapped over to create the options of the Matrial
  UI select form.
  */
  const menuItems = [...countries].sort((a, b) => a.name > b.name).map(country => (
    <MenuItem key={country.pk} value={country.pk}>{country.name}</MenuItem>
  ))

  return(
    <div>
      {authenticating && <div><DotLoader size={50} color={'#2196f3'} className="content" /><br/></div>}
      <Card style={{ maxWidth: 400, margin: '0 auto'}}>
        <CardHeader title="Register"/>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField className="user-auth" type='text' name="username" label="Username" required/><br/>
            <TextField className="user-auth" type='text' name="email" label="Email" required/><br/>
            <TextField className="user-auth" type='password' name="password1" label="Password" required/><br/>
            <TextField className="user-auth" type='password' name="password2" label="Confirm Password" required/><br/>
            <FormControl>
              <InputLabel htmlFor="country">Home Country</InputLabel>
              <Select style={{ textAlign: 'left'}} className="user-auth" name="country" onChange={handleChange} value={country}>
                {menuItems}
              </Select>
            </FormControl><br/><br/>
            <Button variant="contained" color="primary" type="submit">Register</Button>
            <Link to="/login"><Button>Cancel</Button></Link>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

RegistrationForm.propTypes = {
  authenticating: bool,
  handleSubmit: func,
}
