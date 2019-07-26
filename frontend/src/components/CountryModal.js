import React from 'react'
import ReactModal from 'react-modal'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import { Map, TileLayer, Marker } from 'react-leaflet'
import Typography from '@material-ui/core/Typography'

ReactModal.setAppElement('body');

export default function CountryModal(props) {

  const style = {
    width: '100%',
    height: '75%',
    border: '1px solid black',
    margin: '0 auto',
    position: 'relative'
  }

  /*
  The data is all listed as conditional because some of the values do not
  exist for certain country objects e.g. Antarctica does not have a capital
  or borders.
  */
  return (
    <ReactModal isOpen={props.showCountryModal}>
      <IconButton style={{ float: 'right' }} onClick={props.closeCountryModal}>
        <Close />
      </IconButton>
      <div style={{ width: 48, height: 48, float: 'left' }}/>
      <div className='wrap'>
        <div className="left">
          <Typography variant="h4" gutterBottom>
            {props.modalCountry.name}
          </Typography>
          <div>
          <img className="flag" src={props.modalCountry.flag} alt=""/><br/><br/>
          <div style={{ maxWidth: 400, height: 300, position: 'relative', margin: 'auto' }}>
            { props.modalCountry.latlng &&
              <Map
                style={style}
                zoom={4}
                center={[props.modalCountry.latlng[0], props.modalCountry.latlng[1]]}
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[props.modalCountry.latlng[0], props.modalCountry.latlng[1]]}
                />
              </Map>
            }
          </div>
          </div>
        </div>
        <div className="right">
          <Typography variant="h4" gutterBottom>
            Geographic & Political Info
          </Typography>
          <div className="modal-detail">
            <Typography variant='subtitle1' gutterBottom>
              {props.modalCountry.native_name && <div><strong>Native Name</strong>: {props.modalCountry.native_name}</div>}
              {props.modalCountry.alt_spellings && <div><strong>Alternate Spellings</strong>: {props.modalCountry.alt_spellings.join(', ')}</div>}
              {props.modalCountry.capital && <div><strong>Capital</strong>: {props.modalCountry.capital}</div>}
              {props.modalCountry.demonym && <div><strong>Demonym</strong>: {props.modalCountry.demonym}</div>}
              {props.modalCountry.languages && <div><strong>Languages</strong>: {props.modalCountry.languages && props.modalCountry.languages.map(language => language.name).join(', ')}</div>}
              {props.modalCountry.region && <div><strong>Region</strong>: {props.modalCountry.region}</div>}
              {props.modalCountry.subregion && <div><strong>SubRegion</strong>: {props.modalCountry.subregion}</div>}
              {props.modalCountry.borders && <div><strong>Borders</strong>: {props.modalCountry.borders && props.modalCountry.borders.join(', ')}</div>}
              {props.modalCountry.regional_blocs && <div><strong>Regional Trade Blocs</strong>: {props.modalCountry.regional_blocs && props.modalCountry.regional_blocs.map(bloc => bloc.name).join(', ')}</div>}
              {props.modalCountry.population && <div><strong>Population</strong>: {props.modalCountry.population}</div>}
              {props.modalCountry.area && <div><strong>Area</strong>: {props.modalCountry.area} km²</div>}
              {props.modalCountry.latlng && <div><strong>Latitude & Longitude</strong>: {props.modalCountry.latlng && props.modalCountry.latlng.join(', ')}</div>}
              {props.modalCountry.timezones && <div><strong>Timezone(s)</strong>: {props.modalCountry.timezones && props.modalCountry.timezones.join(', ')}</div>}
              {props.modalCountry.top_level_domain && <div><strong>Top Level Domain(s)</strong>: {props.modalCountry.top_level_domain && props.modalCountry.top_level_domain.join(', ')}</div>}
              {props.modalCountry.alpha2code && <div><strong>ISO ALPHA-2</strong>: {props.modalCountry.alpha2code}</div>}
              {props.modalCountry.alpha3code && <div><strong>ISO ALPHA-3</strong>: {props.modalCountry.alpha3code}</div>}
              {props.modalCountry.gini && <div><strong>Gini Coefficient</strong>: {props.modalCountry.gini}</div>}
              {props.modalCountry.numeric_code && <div><strong>Numeric Code</strong>: {props.modalCountry.numeric_code}</div>}
              {props.modalCountry.calling_codes && <div><strong>Calling Code(s)</strong>: {props.modalCountry.calling_codes && props.modalCountry.calling_codes.join(', ')}</div>}
              {props.modalCountry.cioc && <div><strong>CIOC</strong>: {props.modalCountry.cioc}</div>}
            </Typography>
          </div>
        </div>
      </div><br/>
    </ReactModal>
  )
};
