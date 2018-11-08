import React, { Component } from 'react'


class Results extends Component {
  render(){

    const listCountries = this.props.searchedCountry.map((country, i) =>(
      <div key={i}>
        <h3>{country.name}</h3>
        <img className="flag" height="200px" src={country.flag} alt=""/><br/>
        {
          this.props.userCountries.includes(country.name)
          ? <button onClick={this.props.handleClick} name={country.name} className="btn btn-primary" type="button">Remove</button>
          : <button onClick={this.props.handleClick} name={country.name} className="btn btn-primary" type="button">Add</button>
        }
        <br/>
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
