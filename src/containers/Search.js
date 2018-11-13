import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CountryModal from '../components/CountryModal'
import Results from '../components/Results'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import { fetchCountry } from '../actions/countryActions'
import { putUserData } from '../actions/userActions'
import { openCountryModal, closeCountryModal } from '../actions/modalActions'
import { DotLoader } from 'react-spinners'

class Search extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchCountry(e.target.country.value);
  }

  /*
  This function checks to see if the country is already in the user list,
  adds it if it is not, and removes it if it is, then PUT requests the new list
  to the Django API. The button in the Results component is given the
  name = index of the array. Then e.target.name == the index of the clicked
  country in the array of searchedCountry when clicked. From the array index,
  the newCountry object is the searchedCountry[e.target.name].
  */
  handleClick = (e) => {
    e.preventDefault();
    var newCountryList = this.props.userCountries
    var newCountry = this.props.searchedCountry[e.target.name]
    if (this.props.userCountries.findIndex(i => i.name === newCountry.name) === -1) {
      newCountryList = this.props.userCountries.concat([newCountry]);
    } else {
      var index = newCountryList.findIndex(i => i.name === newCountry.name);
      if (index !== -1){
        newCountryList.splice(index, 1);
      }
    }
    this.props.putUserData(
      this.props.username,
      this.props.email,
      newCountryList,
      this.props.home
    );
  }

  render() {
      return (
        <div className="content">
          <SearchBar handleSubmit={this.handleSubmit} /> <br/>
          {this.props.fetching && <DotLoader size={50} color={'#007bff'} className="content" />}
          {this.props.fetched && <Results handleClick={this.handleClick} {...this.props} />}
          <CountryModal {...this.props} />
        </div>
      );
  }
}

const mapState = state => {
  return {
    username: state.user.user.username,
    email: state.user.user.email,
    home: state.user.user.home,
    userCountries: state.user.user.countries,
    authenticated: state.auth.authenticated,
    searchedCountry: state.country.country,
    fetched: state.country.fetched,
    fetching: state.country.fetching,
    showCountryModal: state.modal.showCountryModal,
    modalCountry: state.modal.modalCountry
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchCountry: (query) => dispatch(fetchCountry(query)),
    putUserData: (username, email, countries, home) => dispatch(putUserData(username, email, countries, home)),
    openCountryModal: (country) => dispatch(openCountryModal(country)),
    closeCountryModal: () => dispatch(closeCountryModal())
  };
};

export default connect(mapState, mapDispatch)(Search);

Search.propTypes = {
  username: PropTypes.string,
  email: PropTypes.string,
  home: PropTypes.number,
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
  closeCountryModal: PropTypes.func
};
