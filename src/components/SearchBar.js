import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const SearchBar = (props) => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Search for a Country
      </Typography><br/>
      <TextField className="user-auth" type='text' name="country" placeholder="e.g. Sweden or Spanish"/>
      <Button variant="contained" color="primary" type='submit'>Search</Button>
    </form>
  </div>
);

export default SearchBar;
