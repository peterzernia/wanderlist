import React from 'react'
import { shallow } from 'enzyme'
import { Search } from '../Search'
import { DotLoader } from 'react-spinners'
import CountryModal from '../../components/CountryModal'
import Results from '../../components/Results'
import { tripReport } from '../../testVariables'

describe('<Search />', () =>{
  let wrapper;
  const removeError = jest.fn();
  const e = {
    preventDefault: jest.fn(),
    target: [{ value: 'Aland Islands' }],
    currentTarget: { id: 2, attributes: { value: { nodeValue: 'Aland Islands'} } }
  };
  const fetchCountry = jest.fn();
  const putUserData = jest.fn();
  const home = { id: 1 }

  beforeEach(() => {
    wrapper = shallow(
      <Search
        removeError={removeError} searchedCountry={[]} fetchCountry={fetchCountry}
        putUserData={putUserData} userCountries={[]} home={home}
      />
    )
  });

  it('componentWillUnmount calls authSearch', () => {
    wrapper.instance().componentWillUnmount();
    expect(removeError).toHaveBeenCalledTimes(1);
  });
  it('handleSubmit calls fetchCountry', () => {
    wrapper.instance().handleSubmit(e);
    expect(fetchCountry).toHaveBeenCalledTimes(1);
  });
  it('handleClick calls fetchCountry', () => {
    wrapper.instance().handleClick(e);
    expect(putUserData).toHaveBeenCalledTimes(1);
  });
  it('displays loader', () => {
    expect(wrapper.find(DotLoader).length).toEqual(0);
    wrapper.setProps({ fetching: true })
    expect(wrapper.find(DotLoader).length).toEqual(1);
  });
  it('displays Results', () => {
    expect(wrapper.find(Results).length).toEqual(0);
    wrapper.setProps({ fetched: true, searchedCountry: [tripReport] })
    expect(wrapper.find(Results).length).toEqual(1);
  });
  it('displays CountryModal', () => {
    expect(wrapper.find(CountryModal).length).toEqual(0);
    wrapper.setProps({ fetched: true })
    expect(wrapper.find(CountryModal).length).toEqual(1);
  });
});
