import React, { Component } from 'react'
import { connect } from 'react-redux'
import MapContainer from '../components/MapContainer'

class Map extends Component {
  render(){

    return(
      <div className="content">
        <h1>My Map</h1>
        {
          (this.props.count === 0)
          ? <p> It looks like you haven't added any places yet. </p>
          : null
        }
        <MapContainer {...this.props} />
      </div>
    );
  }
}

const mapState = state => {
  return {
    userCountries: state.user.user.countries,
    count: state.user.user.count
  };
}

const mapDispatch = dispatch => {
  return {
  };
}

export default connect(mapState, mapDispatch)(Map);
