import React, { Component } from 'react'
import ReactModal from 'react-modal'

ReactModal.setAppElement('body');

class CountryModal extends Component {

  render(){
    return(
      <ReactModal isOpen={this.props.showCountryModal}>
        <div className="close-modal">
          <button onClick={this.props.closeCountryModal} className="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className='wrap'>
          <div className="left">
            <h3>{this.props.modalCountry.name}</h3>
            <img className="flag" src={this.props.modalCountry.flag} alt=""/><br/>
          </div>
          <div className="right">
            <h3>Geographic & Political Info</h3>
            <div className="modal-detail">
              Native Name - {this.props.modalCountry.native_name}<br/>
              Alternate Spellings - <br/>
              Capital - {this.props.modalCountry.capital}<br/>
              Demonym - {this.props.modalCountry.demonym}<br/>
              Languages - <br/>
              Region - {this.props.modalCountry.region}<br/>
              SubRegion - {this.props.modalCountry.subregion}<br/>
              Borders - <br/>
              Regional Trade Blocs - <br/>
              Population - {this.props.modalCountry.population}<br/>
              Area - {this.props.modalCountry.area}km²<br/>
              Latitude & Longitude - <br/>
              Timezone(s) - <br/>
              Top Level Domain(s) - <br/>
              ISO ALPHA-2 - {this.props.modalCountry.alpha2code}<br/>
              ISO ALPHA-3 - {this.props.modalCountry.alpha3code}<br/>
              Gini Coefficient - {this.props.modalCountry.gini}<br/>
              Numeric Code - {this.props.modalCountry.numeric_code}<br/>
              Calling Code - <br/>
              CIOC - {this.props.modalCountry.cioc}<br/>
            </div>
          </div>
        </div><br/>
      </ReactModal>
    )
  }
}

export default CountryModal;
