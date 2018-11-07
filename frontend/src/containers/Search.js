import React, { Component } from 'react'
import Results from '../components/Results'
import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import { fetchCountry } from '../actions/countryActions'

class Search extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchCountry(e.target.country.value);
  }

  render() {
      return (
        <div className="search">
          <div className="">
            <SearchBar handleSubmit={this.handleSubmit} /> <br/>
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
    fetchCountry: (query) => {dispatch(fetchCountry(query))
    }
  };
};

export default connect(mapState, mapDispatch)(Search);;
