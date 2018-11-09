import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
console.log(process.env)
console.log(API_KEY)

export class MapContainer extends Component {
  render() {

    const style = {
    width: '300px',
    height: '200px'
    }

    return (
      <div className="content">
        <Map style={style} google={this.props.google} zoom={2}>

        <Marker
          title={'The marker`s title will appear as a tooltip.'}
          name={'SOMA'}
          position={{lat: 37.778519, lng: -122.405640}} />

          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>

              </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (API_KEY)
})(MapContainer)
