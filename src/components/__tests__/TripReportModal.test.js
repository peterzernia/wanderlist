import React from 'react'
import { shallow } from 'enzyme'
import TripReportModal from '../TripReportModal'
import ReactModal from 'react-modal'
import IconButton from '@material-ui/core/IconButton'

describe('<TripReportModal />', () =>{
  it('renders modal', () => {
    const wrapper = shallow(<TripReportModal showTripReportModal={true} />);
    expect(wrapper.find(ReactModal).length).toEqual(1);
  });
  it('closes modal', () => {
    const closeTripReportModal = jest.fn();
    const wrapper = shallow(<TripReportModal closeTripReportModal={closeTripReportModal} showTripReportModal={true} />);
    wrapper.find(IconButton).simulate('click');
    expect(closeTripReportModal).toHaveBeenCalledTimes(1);
  });
});
