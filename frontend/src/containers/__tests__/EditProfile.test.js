import React from 'react'
import { shallow } from 'enzyme'
import { EditProfile } from '../EditProfile'
import { tripReport, user } from '../../testVariables'
import TripReportThumbnail from '../../components/TripReportThumbnail'
import CountryModal from '../../components/CountryModal'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import GoogleMap from '../../components/GoogleMap'
import { DotLoader } from 'react-spinners'

describe('<EditProfile />', () =>{
  let wrapper;
  const fetchUserTripReports = jest.fn();
  const removeError = jest.fn();
  const postTripReport = jest.fn();
  const closePostModal = jest.fn();
  const updateTripReport = jest.fn();
  const putUserData = jest.fn();
  const closeEditProfileModal = jest.fn();
  const openEditProfileModal = jest.fn();
  const toggleFavorite = jest.fn();
  const e = {
    preventDefault: jest.fn(),
    currentTarget: { id: 1 },
    target: {
      countries: { value: '1' },
      country: { value: 1 },
      title: { value: 'test' },
      content: { value: 'test' },
      image: { files: [null] },
      username: { value: 'TestUser' },
      email: { value: 'test@test.com' },
      biography: { value: 'test' }
    }
  };

  beforeEach(() => {
    wrapper = shallow(
      <EditProfile
        fetchUserTripReports={fetchUserTripReports} modalPost={tripReport}
        user={user} removeError={removeError} postTripReport={postTripReport}
        closePostModal={closePostModal} updateTripReport={updateTripReport}
        putUserData={putUserData} userCountries={[]} toggleFavorite={toggleFavorite}
        closeEditProfileModal={closeEditProfileModal} fetchedTripReports={false}
        fetched={false} openEditProfileModal={openEditProfileModal}
      />
    )
  });

  it('componentDidMount calls fetchUserTripReports', () => {
    expect(fetchUserTripReports).toHaveBeenCalledTimes(1);
  });
  it('componentWillUnmount calls removeError', () => {
    wrapper.instance().componentWillUnmount();
    expect(removeError).toHaveBeenCalledTimes(1);
  });
  it('handlePostSubmit calls postTripReport', () => {
    wrapper.instance().handlePostSubmit(e);
    expect(postTripReport).toHaveBeenCalledTimes(1);
    expect(closePostModal).toHaveBeenCalledTimes(1);
  });
  it('handleUpdateSubmit calls putUserData', () => {
    wrapper.instance().handleUpdateSubmit(e);
    expect(updateTripReport).toHaveBeenCalledTimes(1);
    // This is the second time it is called this test suite.
    expect(closePostModal).toHaveBeenCalledTimes(2);
  });
  it('handleSubmit calls putUserData', () => {
    wrapper.instance().handleSubmit(e);
    expect(putUserData).toHaveBeenCalledTimes(1);
    expect(closeEditProfileModal).toHaveBeenCalledTimes(1);
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
  it('button opens EditProfile Modal', () => {
    wrapper.find(Button).simulate('click')
    expect(openEditProfileModal).toHaveBeenCalledTimes(1);
  });
  it('displays GoogleMap', () => {
    expect(wrapper.find(GoogleMap).length).toEqual(0);
    wrapper.setProps({ fetched: true })
    expect(wrapper.find(GoogleMap).length).toEqual(1);
  });
  it('displays loaders', () => {
    expect(wrapper.find(DotLoader).length).toEqual(0);
    wrapper.setProps({ posting: true })
    expect(wrapper.find(DotLoader).length).toEqual(1);
    wrapper.setProps({ updating: true })
    expect(wrapper.find(DotLoader).length).toEqual(2);
    wrapper.setProps({ fetchingTripReports: true })
    expect(wrapper.find(DotLoader).length).toEqual(3);
    wrapper.setProps({ fetchingUserNext: true })
    expect(wrapper.find(DotLoader).length).toEqual(4);
  });
});
