import React from 'react'
import { shallow } from 'enzyme'
import { ViewProfile } from '../ViewProfile'
import { tripReport, user } from '../../testVariables'
import TripReportThumbnail from '../../components/TripReportThumbnail'
import CountryModal from '../../components/CountryModal'
import GoogleMap from '../../components/GoogleMap'
import { DotLoader } from 'react-spinners'

describe('<ViewProfile />', () =>{
  let wrapper;
  const match = { url: '/u/TestUser/', params: {username: 'TestUser'} }
  const fetchSingleUser = jest.fn();
  const fetchUserTripReports = jest.fn();
  const removeError = jest.fn();
  const toggleFavorite = jest.fn();
  const e = { preventDefault: jest.fn(), currentTarget: { id: 1 } }

  beforeEach(() => {
    wrapper = shallow(
      <ViewProfile
        match={match} modalPost={tripReport} user={user}
        fetchSingleUser={fetchSingleUser} fetchUserTripReports={fetchUserTripReports}
        removeError={removeError} toggleFavorite={toggleFavorite}
      />
    )
  });

  it('componentDidMount calls fetchUserTripReports', () => {
    expect(fetchSingleUser).toHaveBeenCalledTimes(1);
    expect(fetchUserTripReports).toHaveBeenCalledTimes(1);
  });
  it('componentWillUnmount calls removeError', () => {
    wrapper.instance().componentWillUnmount();
    expect(removeError).toHaveBeenCalledTimes(1);
  });
  it('handleClick calls toggleFavorite', () => {
    wrapper.instance().handleClick(e);
    expect(toggleFavorite).toHaveBeenCalledTimes(1);
  });
  it('displays Trip Report thumbnails', () => {
    expect(wrapper.find(TripReportThumbnail).length).toEqual(0);
    wrapper.setProps({ fetchedTripReports: true, tripReports: [tripReport, tripReport] })
    // One <TripReportThumbnail /> for every trip report in the array.
    expect(wrapper.find(TripReportThumbnail).length).toEqual(2);
  });
  it('displays CountryModal', () => {
    expect(wrapper.find(CountryModal).length).toEqual(0);
    wrapper.setProps({ fetched: true })
    expect(wrapper.find(CountryModal).length).toEqual(1);
  });
  it('displays GoogleMap', () => {
    expect(wrapper.find(GoogleMap).length).toEqual(0);
    wrapper.setProps({ fetched: true })
    expect(wrapper.find(GoogleMap).length).toEqual(1);
  });
  it('displays loaders', () => {
    expect(wrapper.find(DotLoader).length).toEqual(0);
    wrapper.setProps({ fetchingTripReports: true })
    expect(wrapper.find(DotLoader).length).toEqual(1);
    wrapper.setProps({ fetchingUserNext: true })
    expect(wrapper.find(DotLoader).length).toEqual(2);
  });
});
