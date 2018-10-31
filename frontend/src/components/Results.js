import React, { Component } from 'react';


class Results extends Component {
  render(){
    if (this.props.countryFetched === true){
      return(
        <div className="content">
          <h3>{this.props.name}</h3>
          <img className="flag" height="200px" src={this.props.flag} alt=""/>
          <div>
            Capital City - {this.props.capital} <br/>
            Region - {this.props.region} <br/>
            Subregion - {this.props.subregion} <br/>
            Demonym - {this.props.demonym} <br/>
            Languages - {this.props.languages.map(language =>
              <li key={language.iso639_1}>
                {language.name},&nbsp;
              </li>
            )} <br/>
            Borders - {this.props.borders.map((border, i) =>
              <li key={i}>
                {border},&nbsp;
              </li>
            )}
          </div>
        </div>
      )
    } else{
      return <div/>
    }
  }
}

export default Results
