import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export class MapContainer extends Component {
  render() {

    const style = {
    width: '300px',
    height: '200px',
    border: '1px solid black'
    }

    const listMarkers = this.props.userCountries.map((country, i) =>(
      <Marker
        key={i}
        name={country.name}
        position={{lat: country.latlng[0], lng: country.latlng[1]}} />
    ));


    return (
      <Map style={style} google={this.props.google} zoom={0}>

      {listMarkers}

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>

            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (API_KEY)
})(MapContainer)
