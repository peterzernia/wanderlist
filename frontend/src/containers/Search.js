import React, { Component } from 'react'
import Results from '../components/Results'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import { fetchCountry } from '../actions/countryActions'
import store from "../store/index"


class Search extends Component {
  constructor(){
    super();
    this.state = {
      searched: false
    };
  }
  getCountry = (e) => {
    e.preventDefault();
    const query = e.target.country.value;
    fetchCountry(store, query);
  }
  render() {
    if (this.props.countryFetched === true){
      return (
        <div className="search">
          <div className="">
            <SearchBar getCountry={this.getCountry} /> <br/>
            <Results countryFetched={this.props.countryFetched}
                     name={this.props.country[0].name}
                     capital={this.props.country[0].capital}
                     flag={this.props.country[0].flag}
                     region={this.props.country[0].region}
                     subregion={this.props.country[0].subregion}
                     demonym={this.props.country[0].demonym}
                     languages={this.props.country[0].languages}
                     borders={this.props.country[0].borders}/>
          </div>
        </div>
      );
    } else { return (
        <div className="search">
          <div className="">
            <SearchBar getCountry={this.getCountry} /> <br/>
          </div>
        </div>
    )}
  }
}

const mapState = state => {
  return {
    country: state.country.country,
    countryFetched: state.country.fetched
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
