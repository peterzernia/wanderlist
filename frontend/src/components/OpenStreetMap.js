import React from 'react'
import { shape, func, arrayOf } from 'prop-types'
import { Map, TileLayer, Marker } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

export default function OpenStreetMap(props) {
  const { userCountries, openCountryModal } = props

  const style = {
    position: 'relative',
    display: 'flex',
    width: '95%',
    height: '95%',
    border: '1px solid black',
    overflow: 'hidden',
    margin: '0 auto',
    zIndex: 0,
  }

  const listMarkers = userCountries.map((country) => (
    <Marker
      key={country.id}
      onClick={() => openCountryModal(country)}
      name={country.name}
      position={[country.latlng[0], country.latlng[1]]}
    />
  ))


  return (
    <div className="map">
      <Map
        style={style}
        center={[51.505, 0]}
        zoom={2}
        zoomControl={false}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listMarkers}
      </Map>
    </div>
  )
}

OpenStreetMap.propTypes = {
  userCountries: arrayOf(shape({})).isRequired,
  openCountryModal: func.isRequired,
}
