import React from 'react'
import { shallow } from 'enzyme'
import { Feed } from '../Feed'
import { tripReport } from '../../testVariables'
import TripReportTruncated from '../../components/TripReportTruncated'
import { DotLoader } from 'react-spinners'

describe('<Feed />', () =>{
  let wrapper;
  const removeError = jest.fn();
  const e = {
    preventDefault: jest.fn(),
    currentTarget: { id: 1 },
    target: [{ value: 'Aland Islands' }]
  };
  const toggleFavorite = jest.fn();
  const fetchTripReports = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Feed
        removeError={removeError} toggleFavorite={toggleFavorite}
        fetchTripReports={fetchTripReports}
      />
    )
  });

  it('componentWillUnmount calls removeError', () => {
    wrapper.instance().componentWillUnmount();
    expect(removeError).toHaveBeenCalledTimes(1);
  });
  it('handleClick calls toggleFavorite', () => {
    wrapper.instance().handleClick(e)
    expect(toggleFavorite).toHaveBeenCalledTimes(1);
  });
  it('handleSubmit calls fetchTripReports', () => {
    wrapper.instance().handleSubmit(e)
    expect(fetchTripReports).toHaveBeenCalledTimes(1);
  });
  it('handleNewestClick calls fetchTripReports', () => {
    wrapper.instance().handleNewestClick()
    // The function gets called for the second time this test suite.
    expect(fetchTripReports).toHaveBeenCalledTimes(2);
  });
  it('handleTopClick calls fetchTripReports', () => {
    wrapper.instance().handleTopClick()
    // The function gets called for the third time this test suite.
    expect(fetchTripReports).toHaveBeenCalledTimes(3);
  });
  it('displays Trip Reports', () => {
    expect(wrapper.find(TripReportTruncated).length).toEqual(0);
    wrapper.setProps({ fetched: true, tripReports: [tripReport, tripReport] })
    // One <TripReportThumbnail /> for every trip report in the array.
    expect(wrapper.find(TripReportTruncated).length).toEqual(2);
  });
  it('displays loaders', () => {
    expect(wrapper.find(DotLoader).length).toEqual(0);
    wrapper.setProps({ fetching: true })
    expect(wrapper.find(DotLoader).length).toEqual(1);
    wrapper.setProps({ fetchingNext: true })
    expect(wrapper.find(DotLoader).length).toEqual(2);
  });
});
