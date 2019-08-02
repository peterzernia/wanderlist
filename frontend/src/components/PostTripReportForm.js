import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import countries from '../country_data'

class PostTripReportForm extends Component {

  constructor() {
    super();
    this.state = {
      countries: []
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    /*
    This copies the array to avoid mutation, sorts alphabetically by name,
    then maps to a Material UI MenuItem.
    */
    // const menuItems = [...this.props.user.countries].sort((a, b) => a.name > b.name).map(country => (
    //   <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
    // ))

    /*
    Currently displaying list of all of the countries when posting. New users
    were confused why the list was empty before they had added countries to
    their map. To avoid confusion and make a better user experience, all of the
    countries are shown until UX changes.
    */
    const menuItems = [...countries].sort((a, b) => a.name > b.name).map(country => (
      <MenuItem key={country.pk} value={country.pk}>{country.name}</MenuItem>
    ))

    return(
      <form onSubmit={this.props.handleSubmit}>
        <TextField className="user-auth" type='text' name="title" label="Title" required/><br/>
        <TextField multiline fullWidth className="user-auth" type='text' name="content" label="Content" required/><br/>
        <FormControl>
          <InputLabel htmlFor="countries">Countries</InputLabel>
          <Select style={{ textAlign: 'left'}} className="user-auth" name="countries" onChange={this.handleChange} value={this.state.countries}>
            {menuItems}
          </Select>
        </FormControl><br/>
        <Button style={{ marginTop: 10 }} variant="contained" color="primary" type="submit">Post</Button>
      </form>
    )
  }
};

export default PostTripReportForm;
