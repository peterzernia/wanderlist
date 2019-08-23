import React from 'react'
import { shallow } from 'enzyme'
import { DotLoader } from 'react-spinners'
import { Search } from '../Search'
import CountryModal from '../../components/CountryModal'
import Results from '../../components/Results'
import { tripReport } from '../../testVariables'

describe('<Search />', () => {
  let wrapper
  const props = {
    removeError: jest.fn(),
    fetchCountry: jest.fn(),
    putUserData: jest.fn(),
    home: { id: 1 },
    searchedCountry: [],
  }

  beforeEach(() => {
    wrapper = shallow(
      <Search {...props} />,
    )
  })

  it('displays loader', () => {
    expect(wrapper.find(DotLoader).length).toEqual(0)
    wrapper.setProps({ fetching: true })
    expect(wrapper.find(DotLoader).length).toEqual(1)
  })

  it('displays Results', () => {
    expect(wrapper.find(Results).length).toEqual(0)
    wrapper.setProps({ fetched: true, searchedCountry: [tripReport] })
    expect(wrapper.find(Results).length).toEqual(1)
  })

  it('displays CountryModal', () => {
    expect(wrapper.find(CountryModal).length).toEqual(0)
    wrapper.setProps({ fetched: true })
    expect(wrapper.find(CountryModal).length).toEqual(1)
  })
})
