import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'

const Errors = (props) => {

  /*
  If there are details on the error, they are in the response of the error
  object, but if there are no details, the error is just the message.
  */
  let errorDetails = null;
  if (props.error.response) {
    errorDetails = Object.keys(props.error.response.data).map(error => (
      <p key={error}>
        {error.charAt(0).toUpperCase() + error.slice(1)} - {props.error.response.data[error]}
      </p>
    ));
  } else {
    errorDetails = props.error.message;
  }

  return (
    <div className="error-message">
      <IconButton style={{ float: 'right' }} onClick={props.removeError}>
        <Close />
      </IconButton>
      <div style={{ width: 48, height: 48, float: 'left' }}/>
      {errorDetails}
    </div>
  )
}

export default Errors;
