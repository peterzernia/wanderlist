import React, { Component } from 'react'

class Results extends Component {

  render(){

    const listCountries = this.props.searchedCountry.map((country, i) =>(
      <div key={i}>
        <h3>{country.name}</h3>
        <img className="flag" src={country.flag} alt=""/><br/>
        {
          (this.props.userCountries.findIndex(i => i.name === country.name) === -1)
          ? <button onClick={this.props.handleClick} name={i} className="btn btn-primary" type="button">Add</button>
          : <button onClick={this.props.handleClick} name={i} className="btn btn-primary" type="button">Remove</button>
        }
        <button onClick={() => this.props.openModal(country)} className="btn btn-primary">View More</button>
      </div>
    ));

    return(
      <div className="">
        {listCountries}
      </div>
    )
  }
}

export default Results;
