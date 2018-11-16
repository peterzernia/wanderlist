import React from 'react'

const Errors = (props) => {

  const errorDetails = Object.keys(props.error.response.data).map(error => (
    <div key={error}>
      {error} cannot be blank
    </div>
  ));

  return (
    <div>
      {props.showError && <div className="error-message">Oops! {errorDetails}</div>}
    </div>
  )
}

export default Errors;
