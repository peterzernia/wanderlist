import React from 'react'
import CountryModal from './CountryModal'
import TripReportTruncated from './TripReportTruncated'
import ReactModal from 'react-modal'
import Close from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

ReactModal.setAppElement('body');

const TripReportModal = (props) => {

  return (
    <ReactModal isOpen={props.showTripReportModal}>
      <CountryModal {...props} />
      <IconButton style={{ float: 'right' }} onClick={props.closeTripReportModal}>
        <Close />
      </IconButton><br/>
      <div className='content'>
        <TripReportTruncated {...props.modalPost} handleClick={props.handleClick} {...props} />
      </div>
    </ReactModal>
  )
};

export default TripReportModal;
