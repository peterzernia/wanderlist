import React, { Component } from 'react'
import { connect } from 'react-redux'
import MapContainer from '../components/MapContainer'

class Map extends Component {
  render(){

    return(
      <div className="content">
        <h1>My Map</h1>
        <MapContainer />
      </div>
    );
  }
}

const mapState = state => {
  return {
  };
}

const mapDispatch = dispatch => {
  return {
  };
}

export default connect(mapState, mapDispatch)(Map);
