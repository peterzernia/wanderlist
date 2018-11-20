import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'

const Success = (props) => {

  return (
    <div className="success-message">
      <IconButton style={{ float: 'right', padding: '0 auto' }} onClick={props.removeError}>
        <Close />
      </IconButton>
      <div style={{ width: 48, height: 48, float: 'left' }}/>
      {props.success && <p>{props.success}</p>}
    </div>
  )
}

export default Success;
