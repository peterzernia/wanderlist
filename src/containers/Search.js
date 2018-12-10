import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchCountry } from '../actions/countryActions'
import { openCountryModal, closeCountryModal } from '../actions/modalActions'
import { openNotAuthModal, closeNotAuthModal } from '../actions/modalActions'
import { putUserData } from '../actions/userActions'
import { removeError } from '../actions/errorActions'

import CountryModal from '../components/CountryModal'
import NotAuthModal from '../components/NotAuthModal'
import Results from '../components/Results'
import SearchBar from '../components/SearchBar'

import { DotLoader } from 'react-spinners'

export class Search extends Component {

  componentWillUnmount() {
    this.props.removeError();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchCountry(e.target[0].value);
  }

  /*
  This function handles making the new userCountries array and PUT requesting
  the array to the Django backend.
  */
  handleClick = (e) => {
    e.preventDefault();
    // Resets newCountry to null at the beginning of every function call.
    let newCountry = null;
    let newCountryList;
    let success;
    let countryName = e.currentTarget.attributes.value.nodeValue;
    newCountry =  Number(e.currentTarget.id)
    // If the userCountries array is empty, the new array just becomes the newCountry.
    if (this.props.userCountries.length === 0) {
      newCountryList = [newCountry]
    } else {
      // The newCountryList becomes the userCountries converted from object to just id.
      newCountryList = this.props.userCountries;
      newCountryList = newCountryList.map(country => country.id);
      // If country is not in the userCountries, it gets added.
      if (newCountryList.findIndex(country => country === newCountry) === -1) {
        newCountryList = newCountryList.concat([newCountry]);
        success = `${countryName} has been added to your map.`
      // If country is in the userCountries, it gets deleted.
      } else {
          let index = newCountryList.findIndex(country => country === newCountry);
          // If the index === -1, it means the country is not in the array.
          if (index !== -1){
            newCountryList.splice(index, 1);
          success = `${countryName} has been removed from your map.`
        }
      }
    }
    // Makes the PUT request.
    this.props.putUserData(
      this.props.username,
      this.props.email,
      newCountryList,
      this.props.home.id,
      this.props.biography,
      success
    );
  }

  render() {

    const listCountries = this.props.searchedCountry.map(country =>(
      <div style={{ marginTop: 20 }} key={country.id}>
        <Results {...this.props} country={country} handleClick={this.handleClick}/>
      </div>
    ));

      return (
        <div className="content" style={{marginTop: 60}}>
          <NotAuthModal {...this.props} />
          {this.props.fetched && <CountryModal {...this.props} />}
          <SearchBar handleSubmit={this.handleSubmit} /> <br/>
          {this.props.fetching && <DotLoader size={50} color={'#2196f3'} className="content" />}
          {this.props.fetched && <div>{listCountries}</div>}
        </div>
      );
  }
}

const mapState = state => {
  return {
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
  };
};

const mapDispatch = dispatch => {
  return bindActionCreators({
    fetchCountry,
    putUserData,
    openCountryModal,
    closeCountryModal,
    removeError,
    openNotAuthModal,
    closeNotAuthModal,
  }, dispatch);
};

export default connect(mapState, mapDispatch)(Search);

Search.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  home: PropTypes.object,
  biography: PropTypes.string,
  userCountries: PropTypes.array,
  authenticated: PropTypes.bool,
  searchedCountry: PropTypes.array,
  fetched: PropTypes.bool,
  fetching: PropTypes.bool,
  showCountryModal: PropTypes.bool,
  modalCountry: PropTypes.object,
  showNotAuthModal: PropTypes.bool,

  fetchCountry: PropTypes.func,
  putUserData: PropTypes.func,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
  removeError: PropTypes.func,
  openNotAuthModal: PropTypes.func,
  closeNotAuthModal: PropTypes.func,
};
