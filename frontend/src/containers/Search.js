import React, { Component } from 'react'
import Modal from '../components/Modal'
import Results from '../components/Results'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import { fetchCountry } from '../actions/countryActions'
import { putUserData } from '../actions/userActions'
import { openModal, closeModal } from '../actions/modalActions'
import { DotLoader } from 'react-spinners';

class Search extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchCountry(e.target.country.value);
  }

  /*
  This function checks to see if the country is already in the user list,
  adds it if it is not, and removes it if it is.
  */
  handleClick = (e) => {
    e.preventDefault();
    var newCountryList = this.props.userCountries
    var newCountry = this.props.searchedCountry[e.target.name]
    if (e.target.innerText === 'Remove') {
      var index = newCountryList.findIndex(i => i.name === newCountry.name)
      if (index !== -1){
        newCountryList.splice(index, 1);
      }
    } else {
      newCountryList = this.props.userCountries.concat([newCountry]);
    }
    this.props.putCountry(this.props.username, newCountryList, this.props.home_country);
  }

  render() {
      return (
        <div className="content">
          <SearchBar handleSubmit={this.handleSubmit} /> <br/>
          {
            this.props.fetching
            ? <DotLoader size={50} color={'#007bff'} className="content" />
            : null
          }
          {
            this.props.fetched
            ? <Results handleClick={this.handleClick} {...this.props} />
            : null
          }
          <Modal {...this.props} />
        </div>
      );
  }
}

const mapState = state => {
  return {
    username: state.user.user.username,
    userCountries: state.user.user.countries,
    home_country: state.user.user.home_country,
    authenticated: state.auth.authenticated,
    searchedCountry: state.country.country,
    fetched: state.country.fetched,
    fetching: state.country.fetching,
    showModal: state.modal.showModal,
    modalCountry: state.modal.modalCountry
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchCountry: (query) => dispatch(fetchCountry(query)),
    putUserData: (username, countries, home_country) => dispatch(putUserData(username, countries,home_country)),
    openModal: (country) => dispatch(openModal(country)),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapState, mapDispatch)(Search);;
