import React from 'react'

const Results = (props) => {
  /*
  Results display after search. Users can click "View More" button, to
  view detail of country returned in search results.
  */
  const listCountries = props.searchedCountry.map((country, i) =>(
    <div key={country.id}>
      <h3>{country.name}</h3>
      <img className="flag" src={country.flag} alt=""/><br/>
      {props.authenticated && <button onClick={props.handleClick} name={i} className="btn btn-primary" type="button">Change</button>}
      <button onClick={() => props.openCountryModal(country)} className="btn btn-primary">View More</button>
    </div>
  ));

  return(
    <div className="">
      {listCountries}
    </div>
)};

export default Results;
