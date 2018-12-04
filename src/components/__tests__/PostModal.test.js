import React from 'react'
import { shallow } from 'enzyme'
import PostModal from '../PostModal'
import ReactModal from 'react-modal'
import IconButton from '@material-ui/core/IconButton'

describe('<PostModal />', () =>{
  it('closes modal', () => {
    const closePostModal = jest.fn();
    const wrapper = shallow(<PostModal closePostModal={closePostModal} showPostModal={true} />);
    expect(wrapper.find(ReactModal).length).toEqual(1);
    wrapper.find(IconButton).simulate('click');
    expect(closePostModal).toHaveBeenCalledTimes(1);
  });
});
