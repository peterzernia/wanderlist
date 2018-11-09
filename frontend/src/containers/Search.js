import React, { Component } from 'react'
import Results from '../components/Results'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import { fetchCountry } from '../actions/countryActions'
import { putCountry } from '../actions/userActions'
import { DotLoader } from 'react-spinners';

class Search extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchCountry(e.target.country.value);
  }

  /*
  This function checks to see if the button was the Add or Remove button, and
  changes the country list appropriately.
  */
  handleClick = (e) => {
    e.preventDefault();
    var newCountryList = this.props.userCountries
    var newCountry = this.props.searchedCountry[e.target.name]
    console.log(this.props.userCountries)
    console.log(newCountry)
    if (e.target.innerText === 'Add') {
      newCountryList = this.props.userCountries.concat([newCountry]);
    } else {
      newCountryList = this.props.userCountries.filter(country => country !== newCountry);
    }
    this.props.putCountry(this.props.username, newCountryList);
  }

  render() {
      return (
        <div className="search">
          <div className="">
            <SearchBar handleSubmit={this.handleSubmit} /> <br/>
            {this.props.fetching ? <DotLoader size={50} color={'#007bff'} className="content" /> : null}
            {this.props.fetched ? <Results handleClick={this.handleClick} {...this.props} /> : null}
          </div>
        </div>
      );
  }
}

const mapState = state => {
  return {
    username: state.user.user.username,
    userCountries: state.user.user.countries,
    searchedCountry: state.country.country,
    fetched: state.country.fetched,
    fetching: state.country.fetching
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchCountry: (query) => dispatch(fetchCountry(query)),
    putCountry: (username, countries) => dispatch(putCountry(username, countries))
  };
};

export default connect(mapState, mapDispatch)(Search);;
