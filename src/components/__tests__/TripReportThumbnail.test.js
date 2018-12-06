import React from 'react'
import { shallow, mount } from 'enzyme'
import TripReportThumbnail from '../TripReportThumbnail'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import CardMedia from '@material-ui/core/CardMedia'

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
    expect(wrapper.find(CardMedia).prop("src")).toEqual("https://restcountries.eu/data/afg.svg")
  });
});
