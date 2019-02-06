import React from 'react'
import { shallow, mount } from 'enzyme'
import TripReportThumbnail from '../TripReportThumbnail'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import CardMedia from '@material-ui/core/CardMedia'

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

describe('<TripReportThumbnail />', () =>{
  it('displays menu', () => {
    const tripReport = { title: "Test", countries: [country] }
    const match = { path: "" }
    const wrapper = mount(
      <TripReportThumbnail tripReport={tripReport} match={match} />);
    wrapper.find(IconButton).simulate('click');
    expect('anchorEl' in wrapper.state()).toEqual(true)
    expect(wrapper.find(Menu).length).toEqual(1);
    expect(wrapper.find(MenuItem).length).toEqual(1);
  });
  it('displays edit and delete buttons when on edit_profile page', () => {
    const tripReport = { title: "Test", countries: [country] }
    const match = { path: "/edit_profile" }
    const wrapper = mount(
      <TripReportThumbnail tripReport={tripReport} match={match} />);
    wrapper.find(IconButton).simulate('click');
    expect('anchorEl' in wrapper.state()).toEqual(true)
    expect(wrapper.find(Menu).length).toEqual(1);
    expect(wrapper.find(MenuItem).length).toEqual(3);
  });
  it('opens tripReportModal', () => {
    const tripReport = { title: "Test", countries: [country] }
    const match = { path: "" }
    const openTripReportModal = jest.fn();
    const wrapper = mount(
      <TripReportThumbnail tripReport={tripReport} match={match} openTripReportModal={openTripReportModal} />);
    wrapper.find(IconButton).simulate('click');
    const spy = jest.spyOn(wrapper.instance(), 'handleClose');
    wrapper.find(MenuItem).at(0).simulate('click');
    expect(openTripReportModal).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('opens updatePostModal', () => {
    const tripReport = { title: "Test", countries: [country] }
    const match = { path: "/edit_profile" }
    const openUpdatePostModal = jest.fn();
    const wrapper = mount(
      <TripReportThumbnail tripReport={tripReport} match={match} openUpdatePostModal={openUpdatePostModal} />);
    wrapper.find(IconButton).simulate('click');
    const spy = jest.spyOn(wrapper.instance(), 'handleClose');
    wrapper.find(MenuItem).at(1).simulate('click');
    expect(openUpdatePostModal).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('opens confirmDeleteModal', () => {
    const tripReport = { title: "Test", countries: [country] }
    const match = { path: "/edit_profile" }
    const openConfirmDeleteModal = jest.fn();
    const wrapper = mount(
      <TripReportThumbnail tripReport={tripReport} match={match} openConfirmDeleteModal={openConfirmDeleteModal} />);
    wrapper.find(IconButton).simulate('click');
    const spy = jest.spyOn(wrapper.instance(), 'handleClose');
    wrapper.find(MenuItem).at(2).simulate('click');
    expect(openConfirmDeleteModal).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it('displays proper image', () => {
    const tripReport = { title: "Test", countries: [country], image: "http://test.com/test.jpg" }
    const match = { path: "/" }
    const wrapper = mount(
      <TripReportThumbnail tripReport={tripReport} match={match} />);
    expect(wrapper.find(CardMedia).prop("src")).toEqual("http://test.com/test.jpg")
    wrapper.setProps({ tripReport: { title: "Test", countries: [country] }})
    expect(wrapper.find(CardMedia).prop("src")).toEqual("https://restcountries.eu/data/ala.svg")
  });
});
