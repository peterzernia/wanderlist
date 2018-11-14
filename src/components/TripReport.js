import React from 'react'

const TripReport = (props) => (
  <div className='trip-report'>
    <h4>{props.title}</h4>
    <h5>by {props.author.username} on {props.date_posted}</h5>
    <p>{props.content}</p>
  </div>
);

export default TripReport;
