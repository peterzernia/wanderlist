import React from 'react'
import { mount } from 'enzyme'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import TripReportThumbnail from '../TripReportThumbnail'

const country = {
  id: 2,
  currencies: [
    {
      code: 'EUR',
      name: 'European Euro',
      symbol: '€',
    },
  ],
  languages: [
    {
      iso639_1: 'sv',
      name: 'Swedish',
      native_name: 'svenska',
    },
  ],
  regional_blocs: [
    {
      acronym: 'EU',
      name: 'European Union',
      other_acronyms: null,
      other_names: null,
    },
  ],
  name: 'Aland Islands',
  top_level_domain: [
    '.ax',
  ],
  alpha2code: 'AX',
  alpha3code: 'ALA',
  calling_codes: [
    '358',
  ],
  capital: 'Mariehamn',
  alt_spellings: [
    'AX',
    'Aaland',
    'Åland',
    'Ahvenanmaa',
  ],
  region: 'Europe',
  subregion: 'Northern Europe',
  population: 28875,
  latlng: [
    60.116667,
    19.9,
  ],
  demonym: 'Ålandish',
  area: 1580.0,
  gini: null,
  timezones: [
    'UTC+02:00',
  ],
  borders: [],
  native_name: 'Åland',
  numeric_code: '248',
  flag: 'https://restcountries.eu/data/ala.svg',
  cioc: null,
}

describe('<TripReportThumbnail />', () => {
  it('displays menu', () => {
    const tripReport = { title: 'Test', countries: [country] }
    const match = { path: '' }
    const wrapper = mount(
      <TripReportThumbnail
        tripReport={tripReport}
        match={match}
        openTripReportModal={jest.fn()}
        openConfirmDeleteModal={jest.fn()}
        openUpdatePostModal={jest.fn()}
      />,
    )
    wrapper.find(IconButton).simulate('click')
    expect(wrapper.find(Menu).length).toEqual(1)
    expect(wrapper.find(MenuItem).length).toEqual(1)
  })

  it('displays edit and delete buttons when on profile page', () => {
    const tripReport = { title: 'Test', countries: [country] }
    const match = { path: '/profile' }
    const wrapper = mount(
      <TripReportThumbnail
        tripReport={tripReport}
        match={match}
        openTripReportModal={jest.fn()}
        openConfirmDeleteModal={jest.fn()}
        openUpdatePostModal={jest.fn()}
      />,
    )
    wrapper.find(IconButton).simulate('click')
    expect(wrapper.find(Menu).length).toEqual(1)
    expect(wrapper.find(MenuItem).length).toEqual(3)
  })
})
