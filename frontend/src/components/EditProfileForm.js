import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import countries from '../country_data'

class EditProfileForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      country: props.user.home.id
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    /*
    Importing JSON file with all of the country names and pks from the Django
    database. This array is mapped over to create the options of the Matrial
    UI select form.
    */
    const menuItems = [...countries].sort((a, b) => a.name > b.name).map(country => (
      <MenuItem key={country.pk} value={country.pk}>{country.name}</MenuItem>
    ))

    return(
      <form onSubmit={this.props.handleSubmit}>
        <TextField className="user-auth" type='text' label='Username' name="username" defaultValue={this.props.user.username} required/><br/>
        <TextField className="user-auth" type='text' label='Email' name="email" defaultValue={this.props.user.email} required/><br/>
        <TextField multiline className="user-auth" type='text' label='Biography' name="biography" defaultValue={this.props.user.biography}/><br/>
        <FormControl>
          <InputLabel htmlFor="countries">Home Country</InputLabel>
          <Select style={{ textAlign: 'left'}} className="user-auth" name="country" onChange={this.handleChange} value={this.state.country}>
            {menuItems}
          </Select>
        </FormControl><br/>
        <Button variant="contained" color="primary" type="submit">Update</Button>
        <Button onClick={() => this.props.closeEditProfileModal()} color="secondary">Cancel</Button>
      </form>
    )
  }
}

export default EditProfileForm;
