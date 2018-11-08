import React, { Component } from 'react'
import { connect } from 'react-redux'

class Map extends Component {
  render(){

    const listCountries = this.props.userCountries.map((country, i) =>(
      <li key={i}>{country}</li>
    ));

    return(
      <div className="content">
        <h1>My Map</h1>
        {this.props.count}<br/>
        {listCountries}
      </div>
    );
  }
}

const mapState = state => {
  return {
    count: state.user.user.count,
    userCountries: state.user.user.countries,
    fetched: state.user.fetched
  };
}

const mapDispatch = dispatch => {
  return {
  };
}

export default connect(mapState, mapDispatch)(Map);
