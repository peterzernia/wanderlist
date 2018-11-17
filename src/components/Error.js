import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'

const Errors = (props) => {

  const errorDetails = Object.keys(props.error.response.data).map(error => (
    <div key={error}>
      {error.charAt(0).toUpperCase() + error.slice(1)} - {props.error.response.data[error]}
    </div>
  ));

  return (
    <div className="error-message">
      <IconButton style={{ float: 'right' }} onClick={props.removeError}>
        <Close />
      </IconButton>
      Oops! {errorDetails}
    </div>
  )
}

export default Errors;
