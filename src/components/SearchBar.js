import React from 'react'
import Button from '@material-ui/core/Button';

const SearchBar = (props) => (
  <div className='form-inline'>
    <form onSubmit={props.handleSubmit}>
      <h4>Search for a Country</h4><br/>
      <input className="form-control" type='text' name="country" placeholder="e.g. Sweden or Spanish"/>
      <Button variant="contained" color="primary" type='submit'>Search</Button>
    </form>
  </div>
);

export default SearchBar;
