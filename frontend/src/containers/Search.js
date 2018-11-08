import React, { Component } from 'react'
import Results from '../components/Results'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import { fetchCountry } from '../actions/countryActions'
import { addCountry } from '../actions/userActions'
import { DotLoader } from 'react-spinners';

class Search extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchCountry(e.target.country.value);
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.addCountry('Albania');
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
    country: state.country.country,
    fetched: state.country.fetched,
    fetching: state.country.fetching
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    fetchCountry: (query) => dispatch(fetchCountry(query)),
    addCountry: (countries) => dispatch(addCountry(countries))
  };
};

export default connect(mapState, mapDispatch)(Search);;
