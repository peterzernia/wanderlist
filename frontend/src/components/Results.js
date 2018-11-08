import React, { Component } from 'react'


class Results extends Component {
  render(){

    const listCountries = this.props.country.map((country, i) =>(
      <div key={i}>
        <h3>{country.name}</h3>
        <img className="flag" height="200px" src={country.flag} alt=""/><br/>
        <button onClick={this.props.handleClick} className="btn btn-primary" type="button">Add</button>
      </div>
    ));

    return(
      <div className="content">
        {listCountries}
      </div>
    )
  }
}

export default Results
