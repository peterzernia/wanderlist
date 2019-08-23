import React from 'react'
import { bool, func, shape } from 'prop-types'
import ReactModal from 'react-modal'
import Close from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import TripReportTruncated from './TripReportTruncated'
import CountryModal from './CountryModal'

ReactModal.setAppElement('body')

export default function TripReportModal(props) {
  const {
    showTripReportModal, closeTripReportModal, modalPost, handleClick,
  } = props

  return (
    <ReactModal isOpen={showTripReportModal}>
      <CountryModal {...props} />
      <IconButton style={{ float: 'right' }} onClick={closeTripReportModal}>
        <Close />
      </IconButton>
      <br />
      <div className="content">
        <TripReportTruncated {...modalPost} handleClick={handleClick} {...props} />
      </div>
    </ReactModal>
  )
}

TripReportModal.propTypes = {
  showTripReportModal: bool.isRequired,
  closeTripReportModal: func.isRequired,
  modalPost: shape({}).isRequired,
  handleClick: func.isRequired,
}
