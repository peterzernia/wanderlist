import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

class UpdateTripReportForm extends Component {

  constructor(props) {
    super(props);
    let countryList = props.modalPost.countries.map(country => country.id);
    this.state = {
      title: props.modalPost.title,
      content: props.modalPost.content,
      countries: countryList
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    // This copies the array to avoid mutation, sorts alphabetically by name,
    // then maps to a Material UI MenuItem.
    const menuItems = [...this.props.user.countries].sort((a, b) => a.name > b.name).map(country => (
      <MenuItem value={country.id}>{country.name}</MenuItem>
    ))

    return(
      <form onSubmit={this.props.handleSubmit}>
        <TextField className="user-auth" type='text' name="title" label="Title" onChange={this.handleChange} value={this.state.title}/><br/>
        <TextField multiline fullWidth className="user-auth" type='text' name="content" label="Content" onChange={this.handleChange} value={this.state.content}/><br/>
        <InputLabel shrink htmlFor="countries">Countries</InputLabel><br/>
        <Select style={{ textAlign: 'left'}} multiple className="user-auth" name="countries" onChange={this.handleChange} value={this.state.countries}>
          {menuItems}
        </Select><br/><br/>
        <Button variant="contained" color="primary" type="submit">Post</Button>
      </form>
    )
  }
};

export default UpdateTripReportForm;
