import React from 'react'
import Button from '@material-ui/core/Button'

const Results = (props) => {

  return(
    <div>
      <h3>{props.country.name}</h3>
      <img className="flag" src={props.country.flag} alt=""/><br/>
      {props.authenticated && <Button variant="contained" color="primary" onClick={props.handleClick} name={props.country.id} type="button">Change</Button>}
      <Button variant="contained" color="primary" onClick={() => props.openCountryModal(props.country)} >View More</Button>
    </div>
)};

export default Results;
