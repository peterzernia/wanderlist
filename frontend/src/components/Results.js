import React, { Component } from 'react'


class Results extends Component {
  render(){

    const listCountries = this.props.country.map(country =>(
      <div key={country.alpha2code}>
        <h3>{country.name}</h3>
        <img className="flag" height="200px" src={country.flag} alt=""/>
        <div>
          Capital City - {country.capital} <br/>
          Region - {country.region} <br/>
          Subregion - {country.subregion} <br/>
          Demonym - {country.demonym} <br/>
          Languages - {country.languages.map(language =>
            <li key={language.iso639_1}>
              {language.name},&nbsp;
            </li>
          )} <br/>
          Borders - {country.borders.map((border, i) =>
            <li key={i}>
              {border},&nbsp;
            </li>
          )}
        </div>
        <br/><br/>
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
