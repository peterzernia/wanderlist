import React from 'react'
import { shallow } from 'enzyme'
import CopyLinkModal from '../CopyLinkModal'
import Button from '@material-ui/core/Button'

describe('<CopyLinkModal />', () =>{
  it('closes modal', () => {
    const closeCopyLinkModal = jest.fn();
    const wrapper = shallow(<CopyLinkModal closeCopyLinkModal={closeCopyLinkModal} showCopyLinkModal={true} />);
    wrapper.find('Button').simulate('click');
    expect(closeCopyLinkModal).toHaveBeenCalledTimes(1);
  });
});
