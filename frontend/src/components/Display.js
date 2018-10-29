import React from 'react';

class Display extends React.Component {
  render(){
    return(
      <div>
        {this.props.name} <br/>
        {this.props.capital} <br/>
        <img className='flag' height='150' src={this.props.flag}/>
      </div>
    )
  }
}

export default Display
