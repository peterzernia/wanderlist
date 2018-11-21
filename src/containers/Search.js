import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import CountryModal from '../components/CountryModal'
import Results from '../components/Results'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import { fetchCountry } from '../actions/countryActions'
import { putUserData } from '../actions/userActions'
import { removeError } from '../actions/errorActions'
import { openCountryModal, closeCountryModal } from '../actions/modalActions'
import { DotLoader } from 'react-spinners'

class Search extends Component {

  componentWillUnmount() {
    this.props.removeError();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchCountry(e.target[0].value);
  }

  // This function handles making the new userCountries array and PUT requesting
  // the array to the Django backend.
  handleClick = (e) => {
    e.preventDefault();
    // Resets newCountry to null at the beginning of every function call.
    let newCountry = null;
    let newCountryList
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
      // If country is in the userCountries, it gets deleted.
      } else {
        let index = newCountryList.findIndex(country => country === newCountry);
        // If the index === -1, it means the country is not in the array.
        if (index !== -1){
          newCountryList.splice(index, 1);
        }
      }
    }
    // Makes the PUT request.
    this.props.putUserData(
      this.props.username,
      this.props.email,
      newCountryList,
      this.props.home.id,
      this.props.biography
    );
  }

  render() {

    const listCountries = this.props.searchedCountry.map(country =>(
      <div key={country.id}><Results {...this.props} country={country} handleClick={this.handleClick}/><br/></div>
    ));

      return (
        <div className="content">
          <SearchBar handleSubmit={this.handleSubmit} /> <br/>
          {this.props.fetching && <DotLoader size={50} color={'#2196f3'} className="content" />}
          {this.props.fetched && <div>{listCountries}</div>}
          {this.props.fetched && <CountryModal {...this.props} />}
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
    modalCountry: state.modal.modalCountry
  };
};

const mapDispatch = dispatch => {
  return bindActionCreators({
    fetchCountry,
    putUserData,
    openCountryModal,
    closeCountryModal,
    removeError
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
  fetchCountry: PropTypes.func,
  putUserData: PropTypes.func,
  openCountryModal: PropTypes.func,
  closeCountryModal: PropTypes.func,
  removeError: PropTypes.func
};
