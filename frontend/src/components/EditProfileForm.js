import React, { useState } from 'react'
import { func, shape } from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import countries from '../country_data'

export default function EditProfileForm(props) {
  const {
    handleSubmit, 
    user,
    closeEditProfileModal,
  } = props

  const [country, setCountry] = useState(user.home.id)


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
    <form onSubmit={handleSubmit}>
      <TextField className="user-auth" type='text' label='Username' name="username" defaultValue={user.username} required/><br/>
      <TextField className="user-auth" type='text' label='Email' name="email" defaultValue={user.email} required/><br/>
      <TextField multiline className="user-auth" type='text' label='Biography' name="biography" defaultValue={user.biography}/><br/>
      <FormControl>
        <InputLabel htmlFor="countries">Home Country</InputLabel>
        <Select style={{ textAlign: 'left'}} className="user-auth" name="country" onChange={handleChange} value={country}>
          {menuItems}
        </Select>
      </FormControl><br/>
      <Button variant="contained" color="primary" type="submit">Update</Button>
      <Button onClick={() => closeEditProfileModal()} color="secondary">Cancel</Button>
    </form>
  )
}

EditProfileForm.propTypes = {
  handleSubmit: func,
  user: shape({}),
  closeEditProfileModal: func,
}
