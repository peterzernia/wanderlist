import React, { Component } from 'react'
import Results from '../components/Results'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import { fetchCountry } from '../actions/countryActions'
import store from "../store/index"

class Search extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    const query = e.target.country.value;
    fetchCountry(store, query);
  }
  render() {
      return (
        <div className="search">
          <div className="">
            <SearchBar onSubmit={this.onSubmit} /> <br/>
            {this.props.fetched ? <Results country={this.props.country} /> : null}
          </div>
        </div>
      );
  }
}

const mapState = state => {
  return {
    country: state.country.country,
    fetched: state.country.fetched
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchCountry(store, query) {
      dispatch(fetchCountry(store, query));
    }
  };
};

const SearchContainer = connect(mapState, mapDispatch)(Search);
export default SearchContainer;
