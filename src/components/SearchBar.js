import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

const SearchBar = (props) => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <h2>Search for a Country</h2><br/>
      <TextField className="user-auth" type='text' name="country" placeholder="e.g. Sweden or Spanish"/>
      <Button variant="contained" color="primary" type='submit'>Search</Button>
    </form>
  </div>
);

export default SearchBar;
