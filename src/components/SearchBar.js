import React from 'react'

const SearchBar = (props) => (
  <div className='form-inline'>
    <form onSubmit={props.handleSubmit}>
      <h4>Search for a Country</h4><br/>
      <input className="form-control" type='text' name="country" placeholder="e.g. Sweden or Spanish"/>
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  </div>
);

export default SearchBar;
