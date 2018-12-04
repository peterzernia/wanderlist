import React from 'react'
import { shallow } from 'enzyme'
import PostModal from '../PostModal'
import ReactModal from 'react-modal'

describe('<PostModal />', () =>{
  it('closes modal', () => {
    const wrapper = shallow(<PostModal showPostModal={true} />);
    expect(wrapper.find(ReactModal).length).toEqual(1);
  });
});
