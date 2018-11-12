import React, { Component } from 'react'

class TripReport extends Component {
  render(){
    return(
      <div className='trip-report'>
        <h4>{this.props.title}</h4>
        <h5>by {this.props.author} on {this.props.date_posted}</h5>
        <p>{this.props.content}</p>
      </div>
    )
  }
}

export default TripReport;
