import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
 number, bool, func, arrayOf, shape, string,
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
import { fetchSlugTripReports } from '../actions/tripReportActions'
import { removeError } from '../actions/errorActions'
import { toggleFavorite } from '../actions/favoriteActions'

import CountryModal from '../components/CountryModal'
import CopyLinkModal from '../components/CopyLinkModal'
import NotAuthModal from '../components/NotAuthModal'
import TripReportTruncated from '../components/TripReportTruncated'


export function Post(props) {
  const {
    match,
    tripReports,
    fetching,
  } = props

  useEffect(() => {
    async function fetchData() {
      const { slug } = match.params
      props.fetchSlugTripReports(slug)
    }

    fetchData()
    // eslint-disable-next-line
  }, [props.fetchSlugTripReports, match.params])

  const handleClick = (e) => {
    e.preventDefault()
    props.toggleFavorite(e.currentTarget.id)
  }

  const listTripReport = tripReports && tripReports.map((tripReport) => (
    <div key={tripReport.id} style={{ marginBottom: 20 }}>
      <TripReportTruncated handleClick={handleClick} {...tripReport} {...props} />
    </div>
    ))

  if (fetching) return <div className="centered"><DotLoader size={50} color="#2196f3" className="content" /></div>

  return (
    <div className="content">
      <NotAuthModal {...props} />
      <CopyLinkModal {...props} />
      <CountryModal {...props} />
      <div>{listTripReport}</div>
    </div>
  )
}

const mapState = (state) => ({
    pk: state.user.user.pk,
    authenticated: state.auth.authenticated,
    tripReports: state.tripReport.slugTripReports,
    fetching: state.tripReport.fetchingSlugTripReports,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
    showNotAuthModal: state.modal.showNotAuthModal,
    showCopyLinkModal: state.modal.showCopyLinkModal,
    modalLink: state.modal.modalLink,
  })

const mapDispatch = (dispatch) => bindActionCreators({
    fetchSlugTripReports,
    removeError,
    openCountryModal,
    closeCountryModal,
    toggleFavorite,
    openNotAuthModal,
    closeNotAuthModal,
    openCopyLinkModal,
    closeCopyLinkModal,
  }, dispatch)

export default connect(mapState, mapDispatch)(Post)

Post.propTypes = {
  pk: number,
  authenticated: bool.isRequired,
  tripReports: arrayOf(shape({})).isRequired,
  showCountryModal: bool.isRequired,
  modalCountry: shape({}).isRequired,
  showNotAuthModal: bool.isRequired,
  showCopyLinkModal: bool.isRequired,
  modalLink: string,
  fetchSlugTripReports: func.isRequired,
  removeError: func.isRequired,
  openCountryModal: func.isRequired,
  closeCountryModal: func.isRequired,
  toggleFavorite: func.isRequired,
  openNotAuthModal: func.isRequired,
  closeNotAuthModal: func.isRequired,
  openCopyLinkModal: func.isRequired,
  closeCopyLinkModal: func.isRequired,
  fetching: bool.isRequired,
  match: shape({}).isRequired,
}

Post.defaultProps = {
  pk: null,
  modalLink: '',
}
