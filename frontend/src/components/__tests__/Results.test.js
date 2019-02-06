import React from 'react'
import { shallow, mount } from 'enzyme'
import Results from '../Results'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import IconButton from '@material-ui/core/IconButton'

const country = {
  "id": 2,
  "currencies": [
      {
          "code": "EUR",
          "name": "European Euro",
          "symbol": "€"
      }
  ],
  "languages": [
      {
          "iso639_1": "sv",
          "name": "Swedish",
          "native_name": "svenska"
      }
  ],
  "regional_blocs": [
      {
          "acronym": "EU",
          "name": "European Union",
          "other_acronyms": null,
          "other_names": null
      }
  ],
  "name": "Aland Islands",
  "top_level_domain": [
      ".ax"
  ],
  "alpha2code": "AX",
  "alpha3code": "ALA",
  "calling_codes": [
      "358"
  ],
  "capital": "Mariehamn",
  "alt_spellings": [
      "AX",
      "Aaland",
      "Åland",
      "Ahvenanmaa"
  ],
  "region": "Europe",
  "subregion": "Northern Europe",
  "population": 28875,
  "latlng": [
      60.116667,
      19.9
  ],
  "demonym": "Ålandish",
  "area": 1580.0,
  "gini": null,
  "timezones": [
      "UTC+02:00"
  ],
  "borders": [],
  "native_name": "Åland",
  "numeric_code": "248",
  "flag": "https://restcountries.eu/data/ala.svg",
  "cioc": null
}

describe('<Results />', () =>{
  it('displays menu', () => {
    const openNotAuthModal = jest.fn();
    const wrapper = mount(
      <Results
        openNotAuthModal={openNotAuthModal}
        country={country}
        authenticated={false}
      />);
    // Clicking iconbutton opens menu
    wrapper.find(IconButton).simulate('click');
    expect('anchorEl' in wrapper.state()).toEqual(true)
    expect(wrapper.find(Menu).length).toEqual(1);
    expect(wrapper.find(MenuItem).length).toEqual(2);
  });
  it('proper menuitem clicked/function called when not authenticated', () => {
    const openNotAuthModal = jest.fn();
    const handleClick = jest.fn();
    const wrapper = mount(
      <Results
        handleClick={handleClick}
        openNotAuthModal={openNotAuthModal}
        country={country}
        authenticated={false}
      />);
    wrapper.find(IconButton).simulate('click');
    // Displays Add to Map button, but on click user is not authenticated
    // so onClick is openNotAuthModal.
    wrapper.find(MenuItem).at(0).simulate('click');
    expect(handleClick).toHaveBeenCalledTimes(0);
    expect(openNotAuthModal).toHaveBeenCalledTimes(1);
  });
  it('proper menuitem clicked/function called when authenticated with country not in list', () => {
    const openNotAuthModal = jest.fn();
    const openCountryModal = jest.fn();
    const handleClick = jest.fn();
    const wrapper = mount(
      <Results
        openCountryModal={openCountryModal}
        openNotAuthModal={openNotAuthModal}
        handleClick={handleClick}
        country={country}
        authenticated={true}
        userCountries={[]}
      />);
    const spy = jest.spyOn(wrapper.instance(), 'handleClose');
    wrapper.find(IconButton).simulate('click');
    // Displays Add to Map button, onClick, handleClick is called.
    wrapper.find(MenuItem).at(0).simulate('click');
    expect(wrapper.find(RemoveCircleIcon).length).toEqual(0);
    expect(wrapper.find(AddCircleIcon).length).toEqual(1);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(openNotAuthModal).toHaveBeenCalledTimes(0);
  });
  it('proper menuitem clicked/function called when authenticated with country in list', () => {
    const openNotAuthModal = jest.fn();
    const openCountryModal = jest.fn();
    const handleClick = jest.fn();
    const wrapper = mount(
      <Results
        openCountryModal={openCountryModal}
        openNotAuthModal={openNotAuthModal}
        handleClick={handleClick}
        country={country}
        authenticated={true}
        userCountries={[country]}
      />);
    const spy = jest.spyOn(wrapper.instance(), 'handleClose');
    wrapper.find(IconButton).simulate('click');
    // Displays Add to Map button, onClick, handleClick is called.
    wrapper.find(MenuItem).at(0).simulate('click');
    expect(wrapper.find(RemoveCircleIcon).length).toEqual(1);
    expect(wrapper.find(AddCircleIcon).length).toEqual(0);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(openNotAuthModal).toHaveBeenCalledTimes(0);
  });
  it('opens Country Modal', () => {
    const openNotAuthModal = jest.fn();
    const openCountryModal = jest.fn();
    const handleClick = jest.fn();
    const wrapper = mount(
      <Results
        openCountryModal={openCountryModal}
        openNotAuthModal={openNotAuthModal}
        handleClick={handleClick}
        country={country}
        authenticated={true}
        userCountries={[country]}
      />);
    const spy = jest.spyOn(wrapper.instance(), 'handleClose');
    wrapper.find(IconButton).simulate('click');
    // Displays View More button (second MenuItem), onClick, openCountryModal is called.
    wrapper.find(MenuItem).at(1).simulate('click');
    expect(openCountryModal).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
