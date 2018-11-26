import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const GoogleMap = (props) => {

  const style = {
    position: 'relative',
    display: 'flex',
    width: '95%',
    height: '95%',
    border: '1px solid black',
    margin: '0 auto',
  }

  /*
  Adds clickable Markers to the map at the coordinates of all of the
  countries on the users list.
  */
  const listMarkers = props.userCountries.map(country =>(
    <Marker
      key={country.id}
      onClick={() => props.openCountryModal(country)}
      name={country.name}
      position={{lat: country.latlng[0], lng: country.latlng[1]}} />
  ));


  return (
    <div className='map'>
      <Map options={{ gestureHandling: 'coopertive' }}
           style={style}
           google={props.google}
           zoom={2}>

        {listMarkers}
      </Map>
    </div>
  );
}


export default GoogleApiWrapper({ apiKey: (API_KEY) })(GoogleMap)
