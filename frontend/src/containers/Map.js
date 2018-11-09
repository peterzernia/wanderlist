import React, { Component } from 'react'
import { connect } from 'react-redux'
import MapContainer from '../components/MapContainer'

class Map extends Component {
  render(){

    return(
      <div className="content">
        <h1>My Map</h1>
        <MapContainer userCountries={this.props.userCountries} />
      </div>
    );
  }
}

const mapState = state => {
  return {
    userCountries: state.user.user.countries,
  };
}

const mapDispatch = dispatch => {
  return {
  };
}

export default connect(mapState, mapDispatch)(Map);
