import React from 'react'
import ReactModal from 'react-modal'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import Typography from '@material-ui/core/Typography'

ReactModal.setAppElement('body');
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const CountryModal = (props) => {

  const style = {
    width: '100%',
    height: '75%',
    border: '1px solid black',
    margin: '0 auto',
    position: 'relative'
  }

  return (
    <ReactModal isOpen={props.showCountryModal}>
        <IconButton style={{ float: 'right' }} onClick={props.closeCountryModal}>
          <Close />
        </IconButton><br/>
      <div className='wrap'>
        <div className="left">
          <Typography variant="h4" gutterBottom>
            {props.modalCountry.name}
          </Typography>
          <div>
          <img className="flag" src={props.modalCountry.flag} alt=""/><br/>
            <div style={{ maxWidth: 400, height: 300, position: 'relative', margin: 'auto' }}>
              { props.modalCountry.latlng &&
                <Map
                  options={{ gestureHandling: 'coopertive' }}
                  style={style}
                  google={props.google}
                  zoom={4}
                  initialCenter={{lat: props.modalCountry.latlng[0], lng: props.modalCountry.latlng[1]}}
                >
                  <Marker
                    name={props.modalCountry.name}
                    position={{lat: props.modalCountry.latlng[0], lng: props.modalCountry.latlng[1]}}
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
            <strong>Native Name</strong> - {props.modalCountry.native_name}<br/>
            <strong>Alternate Spellings</strong> - {props.modalCountry.alt_spellings && props.modalCountry.alt_spellings.join(', ')}<br/>
            <strong>Capital</strong> - {props.modalCountry.capital}<br/>
            <strong>Demonym</strong> - {props.modalCountry.demonym}<br/>
            <strong>Languages</strong> - {props.modalCountry.languages && props.modalCountry.languages.map(language => language.name).join(', ')}<br/>
            <strong>Region</strong> - {props.modalCountry.region}<br/>
            <strong>SubRegion</strong> - {props.modalCountry.subregion}<br/>
            <strong>Borders</strong> - {props.modalCountry.borders && props.modalCountry.borders.join(', ')}<br/>
            <strong>Regional Trade Blocs</strong> - {props.modalCountry.regional_blocs && props.modalCountry.regional_blocs.map(bloc => bloc.name).join(', ')}<br/>
            <strong>Population</strong> - {props.modalCountry.population}<br/>
            <strong>Area</strong> - {props.modalCountry.area}km²<br/>
            <strong>Latitude & Longitude</strong> - {props.modalCountry.latlng && props.modalCountry.latlng.join(', ')}<br/>
            <strong>Timezone(s)</strong> - {props.modalCountry.timezones && props.modalCountry.timezones.join(', ')}<br/>
            <strong>Top Level Domain(s)</strong> - {props.modalCountry.top_level_domain && props.modalCountry.top_level_domain.join(', ')}<br/>
            <strong>ISO ALPHA-2</strong> - {props.modalCountry.alpha2code}<br/>
            <strong>ISO ALPHA-3</strong> - {props.modalCountry.alpha3code}<br/>
            <strong>Gini Coefficient</strong> - {props.modalCountry.gini}<br/>
            <strong>Numeric Code</strong> - {props.modalCountry.numeric_code}<br/>
            <strong>Calling Code(s)</strong> - {props.modalCountry.calling_codes && props.modalCountry.calling_codes.join(', ')}<br/>
            <strong>CIOC</strong> - {props.modalCountry.cioc}<br/>
          </div>
        </div>
      </div><br/>
    </ReactModal>
  )
};

export default GoogleApiWrapper({ apiKey: (API_KEY) })(CountryModal);
