import React from 'react'
import { shallow } from 'enzyme'
import TripReportForm from '../TripReportForm'
import MenuItem from '@material-ui/core/MenuItem'

const country = {
    "id": 1,
    "currencies": [
        {
            "code": "AFN",
            "name": "Afghan afghani",
            "symbol": "Afs"
        }
    ],
    "languages": [
        {
            "iso639_1": "tk",
            "name": "Turkmen",
            "native_name": "Türkmen, Түркмен"
        },
        {
            "iso639_1": "uz",
            "name": "Uzbek",
            "native_name": "zbek, Ўзбек, أۇزبېك‎"
        },
        {
            "iso639_1": "ps",
            "name": "Pashto",
            "native_name": "پښتو"
        }
    ],
    "regional_blocs": [
        {
            "acronym": "SAARC",
            "name": "South Asian Association for Regional Cooperation",
            "other_acronyms": null,
            "other_names": null
        }
    ],
    "name": "Afghanistan",
    "top_level_domain": [
        ".af"
    ],
    "alpha2code": "AF",
    "alpha3code": "AFG",
    "calling_codes": [
        "93"
    ],
    "capital": "Kabul",
    "alt_spellings": [
        "AF",
        "Afġānistān"
    ],
    "region": "Asia",
    "subregion": "Southern Asia",
    "population": 27657145,
    "latlng": [
        33.0,
        65.0
    ],
    "demonym": "Afghan",
    "area": 652230.0,
    "gini": 27.8,
    "timezones": [
        "UTC+04:30"
    ],
    "borders": [
        "IRN",
        "PAK",
        "TKM",
        "UZB",
        "TJK",
        "CHN"
    ],
    "native_name": "افغانستان",
    "numeric_code": "004",
    "flag": "https://restcountries.eu/data/afg.svg",
    "cioc": "AFG"
}

describe('<TripReportForm />', () =>{
  it('handles submit', () => {
    const handleSubmit = jest.fn();
    const modalPost = { countries: [country] }
    const wrapper = shallow(<TripReportForm handleSubmit={handleSubmit} modalPost={modalPost} />);
    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
  it('renders MenuItems correctly', () => {
    const handleSubmit = jest.fn();
    const modalPost = { countries: [country] }
    const wrapper = shallow(<TripReportForm handleSubmit={handleSubmit} modalPost={modalPost} />);
    expect(wrapper.find(MenuItem).length).toEqual(250)
  });
});
