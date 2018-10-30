import React from 'react';

class Results extends React.Component {
  render(){
    if (this.props.searched === true){
      return(
        <div className="content">
          <h3>{this.props.name}</h3>
          <img className="flag" height="250" src={this.props.flag} alt=""/>
          <div>
            Capital City - {this.props.capital} <br/>
            Region - {this.props.region} <br/>
            Subregion - {this.props.subregion} <br/>
            Demonym - {this.props.demonym} <br/>
            Language - {this.props.language} <br/>
            Borders - {this.props.borders[0]} <br/>
          </div>
        </div>
      )
    } else{
      return <div/>
    }
  }
}

export default Results
