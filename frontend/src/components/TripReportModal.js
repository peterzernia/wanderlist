import React from 'react'
import { bool, func, shape } from 'prop-types'
import CountryModal from './CountryModal'
import TripReportTruncated from './TripReportTruncated'
import ReactModal from 'react-modal'
import Close from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

ReactModal.setAppElement('body');

export default function TripReportModal(props) {
  const { showTripReportModal, closeTripReportModal, modalPost, handleClick } = props

  return (
    <ReactModal isOpen={showTripReportModal}>
      <CountryModal {...props} />
      <IconButton style={{ float: 'right' }} onClick={closeTripReportModal}>
        <Close />
      </IconButton><br/>
      <div className='content'>
        <TripReportTruncated {...modalPost} handleClick={handleClick} {...props} />
      </div>
    </ReactModal>
  )
};

TripReportModal.propTypes = {
  showTripReportModal: bool,
  closeTripReportModal: func,
  modalPost: shape({}),
  handleClick: func,
}