import React from 'react'
import { shallow, mount } from 'enzyme'
import TripReport from '../TripReport'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import CardHeader from '@material-ui/core/CardHeader'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

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

describe('<TripReport />', () =>{
  it('displays an image and button', () => {
    const image = "http://test.com/test.jpg";
    const countries = [country];
    const author = { username: "Test", home: country };
    const favoriters = [];
    const wrapper = shallow(
      <TripReport
        image={image} author={author} favoriters={favoriters} countries={countries}
      />
    );
    // Finds the action to open image if there is an image
    expect('action' in wrapper.find(CardHeader).props()).toEqual(true);
    wrapper.setProps({ image: null });
    expect('action' in wrapper.find(CardHeader).props()).toEqual(false);
  });
  it('displays correct button when favorited and handles click', () => {
    const countries = [country];
    const author = { username: "Test", home: country };
    const handleClick = jest.fn();
    // props.favoriters includes pk
    const pk = 1;
    const favoriters = [1];
    const wrapper = shallow(
      <TripReport
        author={author} favoriters={favoriters} countries={countries} pk={pk}
        handleClick={handleClick}
      />
    );
    // Should display favorited button.
    expect(wrapper.find(FavoriteIcon).length).toEqual(1);
    expect(wrapper.find(FavoriteBorderIcon).length).toEqual(0);
    wrapper.find(IconButton).at(0).simulate('click');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  it('displays correct button when not favorited and handles click', () => {
    const countries = [country];
    const author = { username: "Test", home: country };
    const handleClick = jest.fn();
    const openNotAuthModal = jest.fn();
    // props.favoriters does not includes pk
    const pk = 1;
    const favoriters = [];
    const wrapper = shallow(
      <TripReport
        author={author} favoriters={favoriters} countries={countries} pk={pk}
        handleClick={handleClick} authenticated={true} openNotAuthModal={openNotAuthModal}
      />
    );
    // Should display not favorited button.
    expect(wrapper.find(FavoriteIcon).length).toEqual(0);
    expect(wrapper.find(FavoriteBorderIcon).length).toEqual(1);
    wrapper.find(IconButton).at(0).simulate('click');
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(openNotAuthModal).toHaveBeenCalledTimes(0);
    // When not authenticated clicking button calls the other function, openNotAuthModal.
    wrapper.setProps({ authenticated: false })
    wrapper.find(IconButton).at(0).simulate('click');
    expect(openNotAuthModal).toHaveBeenCalledTimes(1);
  });
  it('opens CopyLinkModal', () => {
    const countries = [country];
    const author = { username: "Test", home: country };
    const openCopyLinkModal = jest.fn();
    const favoriters = [];
    const wrapper = shallow(
      <TripReport
        author={author} favoriters={favoriters} countries={countries}
        openCopyLinkModal={openCopyLinkModal}
      />
    );
    wrapper.find(IconButton).at(1).simulate('click');
    expect(openCopyLinkModal).toHaveBeenCalledTimes(1);

  });
  it('opens CountryModal', () => {
    const countries = [country];
    const author = { username: "Test", home: country };
    const openCountryModal = jest.fn();
    const favoriters = [];
    const wrapper = shallow(
      <TripReport
        author={author} favoriters={favoriters} countries={countries}
        openCountryModal={openCountryModal}
      />
    );
    expect(wrapper.find(Button).length).toEqual(1);
    wrapper.find(Button).simulate('click');
    expect(openCountryModal).toHaveBeenCalledTimes(1);
    // Displays a button for every country.
    wrapper.setProps({ countries: [] })
    expect(wrapper.find(Button).length).toEqual(0);
    wrapper.setProps({ countries: [country, country, country] })
    expect(wrapper.find(Button).length).toEqual(3);
  });
});
