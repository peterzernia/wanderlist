import React from 'react'

const Errors = (props) => (
  <div>
    {props.showError && <div className="error-message">Oops! Something went wrong!</div>}
  </div>
);

export default Errors
