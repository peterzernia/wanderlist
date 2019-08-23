import React from 'react'
import { func, string } from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'

const Success = ({ removeError, success }) => (
  <div className="success-message">
    <IconButton style={{ float: 'right', padding: '0 auto' }} onClick={removeError}>
      <Close />
    </IconButton>
    <div style={{ width: 48, height: 48, float: 'left' }}/>
    {success && <p>{success}</p>}
  </div>
)

export default Success;

Success.propTypes = {
  removeError: func,
  success: string,
}