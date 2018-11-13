import React from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('body');

const CountryModal = (props) => (
  <ReactModal isOpen={props.showCountryModal}>
    <div className="close-modal">
      <button onClick={props.closeCountryModal} className="close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className='wrap'>
      <div className="left">
        <h3>{props.modalCountry.name}</h3>
        <img className="flag" src={props.modalCountry.flag} alt=""/><br/>
      </div>
      <div className="right">
        <h3>Geographic & Political Info</h3>
        <div className="modal-detail">
          Native Name - {props.modalCountry.native_name}<br/>
          Alternate Spellings - <br/>
          Capital - {props.modalCountry.capital}<br/>
          Demonym - {props.modalCountry.demonym}<br/>
          Languages - <br/>
          Region - {props.modalCountry.region}<br/>
          SubRegion - {props.modalCountry.subregion}<br/>
          Borders - <br/>
          Regional Trade Blocs - <br/>
          Population - {props.modalCountry.population}<br/>
          Area - {props.modalCountry.area}km²<br/>
          Latitude & Longitude - <br/>
          Timezone(s) - <br/>
          Top Level Domain(s) - <br/>
          ISO ALPHA-2 - {props.modalCountry.alpha2code}<br/>
          ISO ALPHA-3 - {props.modalCountry.alpha3code}<br/>
          Gini Coefficient - {props.modalCountry.gini}<br/>
          Numeric Code - {props.modalCountry.numeric_code}<br/>
          Calling Code - <br/>
          CIOC - {props.modalCountry.cioc}<br/>
        </div>
      </div>
    </div><br/>
  </ReactModal>
);

export default CountryModal;
