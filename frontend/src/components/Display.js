import React from 'react';

class Display extends React.Component {
  render(){
    return(
      <div className="content">
        {this.props.name} <br/>
        {this.props.capital} <br/>
        <img className="flag" height="150" src={this.props.flag} alt=""/>
      </div>
    )
  }
}

export default Display
