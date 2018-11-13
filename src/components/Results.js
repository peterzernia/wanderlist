import React from 'react'
import Button from '@material-ui/core/Button'

const Results = (props) => {
  /*
  Results display after search. Users can click "View More" button, to
  view detail of country returned in search results.
  */
  const listCountries = props.searchedCountry.map((country, i) =>(
    <div key={country.id}>
      <h3>{country.name}</h3>
      <img className="flag" src={country.flag} alt=""/><br/>
      {props.authenticated && <Button variant="contained" color="primary" onClick={props.handleClick} name={i}type="button">Change</Button>}
      <Button variant="contained" color="primary" onClick={() => props.openCountryModal(country)} >View More</Button>
    </div>
  ));

  return(
    <div className="">
      {listCountries}
    </div>
)};

export default Results;
