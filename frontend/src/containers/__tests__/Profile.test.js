import React from 'react'
import { shallow } from 'enzyme'
import { Profile } from '../Profile'
import { tripReport, user } from '../../testVariables'
import TripReportThumbnail from '../../components/TripReportThumbnail'
import CountryModal from '../../components/CountryModal'
import Button from '@material-ui/core/Button'
import OpenStreetMap from '../../components/OpenStreetMap'
import { DotLoader } from 'react-spinners'

describe('<Profile />', () =>{
  let wrapper;
  const props = {
    fetchUserTripReports: jest.fn(),
    removeError: jest.fn(),
    postTripReport: jest.fn(),
    closePostModal: jest.fn(),
    updateTripReport: jest.fn(),
    putUserData: jest.fn(),
    closeEditProfileModal: jest.fn(),
    openEditProfileModal: jest.fn(),
    toggleFavorite: jest.fn(),
    modalPost:{tripReport},
    user, 
    userCountries:[],
    fetchedTripReports: false,
    fetched: false,
    location: { pathname: '/edit_profile' } 
  }

  const e = {
    preventDefault: jest.fn(),
    currentTarget: { id: 1 },
    target: {
      countries: { value: '1' },
      country: { value: 1 },
      title: { value: 'test' },
      content: { value: 'test' },
      username: { value: 'TestUser' },
      email: { value: 'test@test.com' },
      biography: { value: 'test' }
    }
  };

  beforeEach(() => {
    wrapper = shallow(
      <Profile { ...props} />
    )
  });

  it('componentDidMount calls fetchUserTripReports', () => {
    expect(props.fetchUserTripReports).toHaveBeenCalledTimes(1);
  });
  it('componentWillUnmount calls removeError', () => {
    wrapper.instance().componentWillUnmount();
    expect(props.removeError).toHaveBeenCalledTimes(1);
  });
  it('handlePostSubmit calls postTripReport', () => {
    wrapper.instance().handlePostSubmit(e);
    expect(props.postTripReport).toHaveBeenCalledTimes(1);
    expect(props.closePostModal).toHaveBeenCalledTimes(1);
  });
  it('handleUpdateSubmit calls putUserData', () => {
    wrapper.instance().handleUpdateSubmit(e);
    expect(props.updateTripReport).toHaveBeenCalledTimes(1);
    // This is the second time it is called this test suite.
    expect(props.closePostModal).toHaveBeenCalledTimes(2);
  });
  it('handleSubmit calls putUserData', () => {
    wrapper.instance().handleSubmit(e);
    expect(props.putUserData).toHaveBeenCalledTimes(1);
    expect(props.closeEditProfileModal).toHaveBeenCalledTimes(1);
  });
  it('handleClick calls toggleFavorite', () => {
    wrapper.instance().handleClick(e);
    expect(props.toggleFavorite).toHaveBeenCalledTimes(1);
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
    expect(props.openEditProfileModal).toHaveBeenCalledTimes(1);
  });
  it('displays OpenStreetMap', () => {
    expect(wrapper.find(OpenStreetMap).length).toEqual(0);
    wrapper.setProps({ fetched: true })
    expect(wrapper.find(OpenStreetMap).length).toEqual(1);
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
