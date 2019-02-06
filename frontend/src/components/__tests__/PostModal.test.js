import React from 'react'
import { shallow } from 'enzyme'
import PostModal from '../PostModal'
import ReactModal from 'react-modal'
import IconButton from '@material-ui/core/IconButton'
import UpdateTripReportForm from '../UpdateTripReportForm'
import PostTripReportForm from '../PostTripReportForm'

describe('<PostModal />', () =>{
  it('closes modal', () => {
    const closePostModal = jest.fn();
    const wrapper = shallow(<PostModal closePostModal={closePostModal} showPostModal={true} />);
    expect(wrapper.find(ReactModal).length).toEqual(1);
    wrapper.find(IconButton).simulate('click');
    expect(closePostModal).toHaveBeenCalledTimes(1);
  });
  it('renders post/update forms conditionally', () => {
    const wrapper = shallow(<PostModal updatePostModal={false} showPostModal={true} />);
    expect(wrapper.find(PostTripReportForm).length).toEqual(1);
    expect(wrapper.find(UpdateTripReportForm).length).toEqual(0);
    wrapper.setProps({ updatePostModal: true })
    expect(wrapper.find(PostTripReportForm).length).toEqual(0);
    expect(wrapper.find(UpdateTripReportForm).length).toEqual(1);
  });
});
