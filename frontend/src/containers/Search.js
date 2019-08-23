import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
 string, shape, arrayOf, bool, func,
} from 'prop-types'

import { DotLoader } from 'react-spinners'
import { fetchCountry } from '../actions/countryActions'
import {
 openCountryModal, closeCountryModal, openNotAuthModal, closeNotAuthModal,
} from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { removeError } from '../actions/errorActions'

import CountryModal from '../components/CountryModal'
import NotAuthModal from '../components/NotAuthModal'
import Results from '../components/Results'
import SearchBar from '../components/SearchBar'


export function Search(props) {
  const {
    username,
    email,
    home,
    biography,
    userCountries,
    searchedCountry,
    fetched,
    fetching,
  } = props

  const handleSubmit = (e) => {
    e.preventDefault()
    props.fetchCountry(e.target[0].value)
  }

  /*
  This function handles making the new userCountries array and PUT requesting
  the array to the Django backend.
  */
  const handleClick = (e) => {
    e.preventDefault()
    // Resets newCountry to null at the beginning of every function call.
    let newCountry = null
    let newCountryList
    let success
    const countryName = e.currentTarget.attributes.value.nodeValue
    newCountry = Number(e.currentTarget.id)
    // If the userCountries array is empty, the new array just becomes the newCountry.
    if (userCountries.length === 0) {
      newCountryList = [newCountry]
    } else {
      // The newCountryList becomes the userCountries converted from object to just id.
      newCountryList = userCountries
      newCountryList = newCountryList.map((country) => country.id)
      // If country is not in the userCountries, it gets added.
      if (newCountryList.findIndex((country) => country === newCountry) === -1) {
        newCountryList = newCountryList.concat([newCountry])
        success = `${countryName} has been added to your map.`
      // If country is in the userCountries, it gets deleted.
      } else {
          const index = newCountryList.findIndex((country) => country === newCountry)
          // If the index === -1, it means the country is not in the array.
          if (index !== -1) {
            newCountryList.splice(index, 1)
          success = `${countryName} has been removed from your map.`
        }
      }
    }

    // Makes the PUT request.
   props.putUserData(
      username,
      email,
      newCountryList,
      home.id,
      biography,
      success,
    )
  }

  const listCountries = searchedCountry.map((country) => (
    <div style={{ marginTop: 20 }} key={country.id}>
      <Results {...props} country={country} handleClick={handleClick} />
    </div>
  ))

  return (
    <div className="content" style={{ marginTop: 60 }}>
      <NotAuthModal {...props} />
      {fetched && <CountryModal {...props} />}
      <SearchBar handleSubmit={handleSubmit} />
      {' '}
      <br />
      {fetching && <DotLoader size={50} color="#2196f3" className="content" />}
      {fetched && <div>{listCountries}</div>}
    </div>
  )
}

const mapState = (state) => ({
    username: state.user.user.username,
    email: state.user.user.email,
    home: state.user.user.home,
    biography: state.user.user.biography,
    userCountries: state.user.user.countries,
    authenticated: state.auth.authenticated,
    searchedCountry: state.country.country,
    fetched: state.country.fetched,
    fetching: state.country.fetching,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry,
    showNotAuthModal: state.modal.showNotAuthModal,
  })

const mapDispatch = (dispatch) => bindActionCreators({
    fetchCountry,
    putUserData,
    openCountryModal,
    closeCountryModal,
    removeError,
    openNotAuthModal,
    closeNotAuthModal,
  }, dispatch)

export default connect(mapState, mapDispatch)(Search)

Search.propTypes = {
  username: string,
  email: string,
  home: shape({}),
  biography: string,
  userCountries: arrayOf(shape({})),
  authenticated: bool.isRequired,
  searchedCountry: arrayOf(shape({})).isRequired,
  fetched: bool.isRequired,
  fetching: bool.isRequired,
  showCountryModal: bool.isRequired,
  modalCountry: shape({}).isRequired,
  showNotAuthModal: bool.isRequired,
  fetchCountry: func.isRequired,
  putUserData: func.isRequired,
  openCountryModal: func.isRequired,
  closeCountryModal: func.isRequired,
  removeError: func.isRequired,
  openNotAuthModal: func.isRequired,
  closeNotAuthModal: func.isRequired,
}

Search.defaultProps = {
  username: '',
  email: '',
  home: {},
  biography: '',
  userCountries: [],
}
