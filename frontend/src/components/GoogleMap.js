import React, { Component } from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export class GoogleMap extends Component {
  render() {

    const style = {
    width: '700px',
    height: '450px',
    border: '.5px solid black'
    }

    const listMarkers = this.props.userCountries.map((country, i) =>(
      <Marker
        key={i}
        onClick={() => this.props.openCountryModal(country)}
        name={country.name}
        position={{lat: country.latlng[0], lng: country.latlng[1]}} />
    ));


    return (
      <div className='map'>
        <Map options={{ gestureHandling: 'coopertive' }}
             style={style}
             google={this.props.google}
             zoom={2}>
          {listMarkers}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (API_KEY)
})(GoogleMap)
