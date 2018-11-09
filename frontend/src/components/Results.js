import React, { Component } from 'react'

class Results extends Component {

  render(){

    const listCountries = this.props.searchedCountry.map((country, i) =>(
      <div key={i}>
        <h3>{country.name}</h3>
        <img className="flag" src={country.flag} alt=""/><br/>
        Languages - {country.languages.map(language =>
            <li className="languages" key={language.iso639_1}>
              {language.name},&nbsp;
            </li>
        )}<br/>
        {
          this.props.userCountries.includes(country)
          ? <button onClick={this.props.handleClick} name={i} className="btn btn-primary" type="button">Remove</button>
          : <button onClick={this.props.handleClick} name={i} className="btn btn-primary" type="button">Add</button>
        }
        <button onClick={this.props.openModal} className="btn btn-primary">View More</button>
      </div>
    ));

    return(
      <div className="">
        {listCountries}
      </div>
    )
  }
}

export default Results
