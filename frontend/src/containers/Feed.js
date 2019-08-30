import React, { useEffect, useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
 number, bool, string, arrayOf, shape, func,
} from 'prop-types'

import { DotLoader } from 'react-spinners'
import {
 openCopyLinkModal,
 closeCopyLinkModal,
 openCountryModal,
 closeCountryModal,
 openNotAuthModal,
 closeNotAuthModal,
} from '../actions/modalActions'
import { fetchTripReports, fetchNextTripReports } from '../actions/tripReportActions'
import { removeError } from '../actions/errorActions'
import { toggleFavorite } from '../actions/favoriteActions'

import CountryModal from '../components/CountryModal'
import CopyLinkModal from '../components/CopyLinkModal'
import Filter from '../components/Filter'
import NotAuthModal from '../components/NotAuthModal'
import TripReportTruncated from '../components/TripReportTruncated'


export function Feed(props) {
  const {
    next,
    tripReports,
    fetching,
  } = props

  const isBottom = (el) => {
    if (el) return el.getBoundingClientRect().bottom <= window.innerHeight
    return false
  }

  // Infinite scrolling
  const handleScroll = useCallback(() => {
    const el = document.getElementById('scroll')
    if (isBottom(el) && next && !props.fetchingNext) {
      props.fetchNextTripReports(next)
    }
  }, [next, props])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleClick = (e) => {
    e.preventDefault()
    toggleFavorite(e.currentTarget.id)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchTripReports(`${process.env.REACT_APP_API_URL}/api/v1/reports/?search=${e.target[0].value}`)
  }

  const handleNewestClick = () => {
    fetchTripReports(`${process.env.REACT_APP_API_URL}/api/v1/reports/?ordering=-pk`)
  }

  const handleTopClick = () => {
    fetchTripReports(`${process.env.REACT_APP_API_URL}/api/v1/reports/`)
  }

  const listTripReports = tripReports && tripReports.map((tripReport) => (
    <div key={tripReport.id} style={{ marginBottom: 20 }}>
      <TripReportTruncated handleClick={handleClick} {...tripReport} {...props} />
    </div>
    ))

  if (fetching) {
    return (
      <div>
        <DotLoader size={50} color="#2196f3" className="content" />
        <br />
      </div>
    )
 }

  return (
    <div id="scroll" className="content" style={{ marginTop: 0 }}>
      <CopyLinkModal {...props} />
      <NotAuthModal {...props} />
      <CountryModal {...props} />
      <Filter
        handleSubmit={handleSubmit}
        handleNewestClick={handleNewestClick}
        handleTopClick={handleTopClick}
      />
      <div>{listTripReports}</div>
      <div style={{ height: 15 }} />
      {props.fetchingNext && <DotLoader size={50} color="#2196f3" className="content" />}
    </div>
  )
}

const mapState = (state) => ({
    pk: state.user.user.pk,
    authenticated: state.auth.authenticated,
    fetching: state.tripReport.fetching,
    next: state.tripReport.tripReports.next,
    fetchingNext: state.tripReport.fetchingNext,
    tripReports: state.tripReport.tripReports.results,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
    showNotAuthModal: state.modal.showNotAuthModal,
    showCopyLinkModal: state.modal.showCopyLinkModal,
    modalLink: state.modal.modalLink,
  })

const mapDispatch = (dispatch) => bindActionCreators({
    openCountryModal,
    closeCountryModal,
    removeError,
    fetchNextTripReports,
    fetchTripReports,
    toggleFavorite,
    openNotAuthModal,
    closeNotAuthModal,
    openCopyLinkModal,
    closeCopyLinkModal,
  }, dispatch)

export default connect(mapState, mapDispatch)(Feed)

Feed.propTypes = {
  pk: number,
  authenticated: bool.isRequired,
  fetching: bool.isRequired,
  next: string,
  tripReports: arrayOf(shape({})).isRequired,
  showCountryModal: bool.isRequired,
  modalCountry: shape({}).isRequired,
  showNotAuthModal: bool.isRequired,
  showCopyLinkModal: bool.isRequired,
  modalLink: string,
  fetchingNext: bool.isRequired,
  openCountryModal: func.isRequired,
  closeCountryModal: func.isRequired,
  removeError: func.isRequired,
  fetchNextTripReports: func.isRequired,
  fetchTripReports: func.isRequired,
  toggleFavorite: func.isRequired,
  openNotAuthModal: func.isRequired,
  closeNotAuthModal: func.isRequired,
  openCopyLinkModal: func.isRequired,
  closeCopyLinkModal: func.isRequired,
}

Feed.defaultProps = {
  modalLink: '',
  pk: null,
  next: null,
}
