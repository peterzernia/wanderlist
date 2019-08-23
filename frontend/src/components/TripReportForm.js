import React, { useState } from 'react'
import { shape, func } from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import countries from '../country_data'

export default function TripReportForm({ modalPost, handleSubmit }) {
  const [state, setState] = useState({
    title: modalPost.title || '',
    content: modalPost.content || '',
    countries: modalPost.countries ? modalPost.countries.map((country) => country.id) : [],
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  // This copies the array to avoid mutation, sorts alphabetically by name,
  // then maps to a Material UI MenuItem.
  // const menuItems = [...props.user.countries].sort((a, b) => a.name > b.name).map(country => (
  //   <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
  // ))

  /*
  Currently displaying list of all of the countries when posting. New users
  were confused why the list was empty before they had added countries to
  their map. To avoid confusion and make a better user experience, all of the
  countries are shown until UX changes.
  */
  const menuItems = [...countries].sort((a, b) => a.name > b.name).map((country) => (
    <MenuItem key={country.pk} value={country.pk}>{country.name}</MenuItem>
  ))

  return (
    <form onSubmit={handleSubmit}>
      <TextField className="user-auth" type="text" name="title" label="Title" onChange={handleChange} value={state.title} required />
      <br />
      <TextField multiline fullWidth className="user-auth" type="text" name="content" label="Content" onChange={handleChange} value={state.content} required />
      <br />
      <FormControl>
        <InputLabel htmlFor="countries">Countries</InputLabel>
        <Select style={{ textAlign: 'left' }} className="user-auth" name="countries" onChange={handleChange} value={state.countries}>
          {menuItems}
        </Select>
      </FormControl>
      <br />
      <Button style={{ marginTop: 10 }} variant="contained" color="primary" type="submit">Update</Button>
    </form>
  )
}

TripReportForm.propTypes = {
  modalPost: shape({}).isRequired,
  handleSubmit: func.isRequired,
}
