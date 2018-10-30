import React from 'react';


class SearchBar extends React.Component {
  render(){
    return(
        <div className='form-inline'>
          <form onSubmit={ this.props.getCountry }>
            <h4>Search for a Country</h4><br/>
            <input className="form-control" type='text' name="country" placeholder="Country"/>
            <button className="btn btn-primary" type="submit">Submit</button>
          </form>
        </div>
    )
  }
}

export default SearchBar;
