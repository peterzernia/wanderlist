import React from 'react'
import ReactModal from 'react-modal'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'

ReactModal.setAppElement('body');

const CountryModal = (props) => {
  return (
    <ReactModal isOpen={props.showCountryModal}>
        <IconButton style={{ float: 'right' }} onClick={props.closeCountryModal}>
          <Close />
        </IconButton><br/>
      <div className='wrap'>
        <div className="left">
          <h3>{props.modalCountry.name}</h3>
          <img className="flag" src={props.modalCountry.flag} alt=""/><br/>
        </div>
        <div className="right">
          <h3>Geographic & Political Info</h3>
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

export default CountryModal;
