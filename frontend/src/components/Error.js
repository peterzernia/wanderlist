import React from 'react'
import { shape, func } from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'

const Errors = (props) => {
  const { error, removeError } = props

  /*
  If there are details on the error, they are in the response of the error
  object, but if there are no details, the error is just the message.
  */
  let errorDetails = null;
  if (error.response) {
    errorDetails = Object.keys(error.response.data).map(error => (
      <p key={error}>
        {error.charAt(0).toUpperCase() + error.slice(1)} - {error.response.data[error]}
      </p>
    ));
  } else {
    errorDetails = error.message;
  }

  return (
    <div className="error-message">
      <IconButton style={{ float: 'right' }} onClick={removeError}>
        <Close />
      </IconButton>
      <div style={{ width: 48, height: 48, float: 'left' }}/>
      {errorDetails}
    </div>
  )
}

export default Errors;

Errors.propTypes = {
  error: shape({}),
  removeError: func,
}