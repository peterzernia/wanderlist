import React from 'react'
import { shallow } from 'enzyme'
import { Post } from '../Post'
import { DotLoader } from 'react-spinners'
import CountryModal from '../../components/CountryModal'
import TripReport from '../../components/TripReport'
import { tripReport } from '../../testVariables'

describe('<Post />', () =>{
  let wrapper;
  const fetchSlugTripReports = jest.fn();
  const match = { params : { slug: "AO3TH39223S" }}
  const removeError = jest.fn();
  const e = { preventDefault: jest.fn(), currentTarget: { id: 1 } };
  const toggleFavorite = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Post
        fetchSlugTripReports={fetchSlugTripReports} match={match}
        removeError={removeError} toggleFavorite={toggleFavorite}
        fetched={false} fetching={false}
      />
    )
  });

  it('componentDidMount calls fetchSlugTripReports', () => {
    expect(fetchSlugTripReports).toHaveBeenCalledTimes(1);
  });
  it('componentWillUnmount calls fetchSlugTripReports', () => {
    wrapper.instance().componentWillUnmount();
    expect(removeError).toHaveBeenCalledTimes(1);
  });
  it('handleClick calls toggleFavorite', () => {
    wrapper.instance().handleClick(e);
    expect(toggleFavorite).toHaveBeenCalledTimes(1);
  });
  it('displays loader', () => {
    expect(wrapper.find(DotLoader).length).toEqual(0);
    wrapper.setProps({ fetching: true })
    expect(wrapper.find(DotLoader).length).toEqual(1);
  });
  it('displays TripReport', () => {
    expect(wrapper.find(TripReport).length).toEqual(0);
    wrapper.setProps({ fetched: true, tripReports: [tripReport, tripReport] })
    // One <TripReport /> for every trip report in the array.
    expect(wrapper.find(TripReport).length).toEqual(2);
  });
  it('displays CountryModal', () => {
    expect(wrapper.find(CountryModal).length).toEqual(0);
    wrapper.setProps({ fetched: true })
    expect(wrapper.find(CountryModal).length).toEqual(1);
  });
});
