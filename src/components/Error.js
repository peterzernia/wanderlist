import React from 'react'

const Errors = (props) => {

  const errorDetails = Object.keys(props.error.response.data).map(error => (
    <div key={error}>
      {error.charAt(0).toUpperCase() + error.slice(1)} - {props.error.response.data[error]}
    </div>
  ));

  return (
    <div className="error-message">
      Oops! {errorDetails}
    </div>
  )
}

export default Errors;
