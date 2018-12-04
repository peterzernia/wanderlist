import React from 'react'
import { shallow } from 'enzyme'
import NotAuthModal from '../NotAuthModal'
import Button from '@material-ui/core/Button'

describe('<NotAuthModal />', () =>{
  it('closes modal', () => {
    const closeNotAuthModal = jest.fn();
    const wrapper = shallow(<NotAuthModal closeNotAuthModal={closeNotAuthModal} showNotAuthModal={true} />);
    wrapper.find(Button).simulate('click');
    expect(closeNotAuthModal).toHaveBeenCalledTimes(1);
  });
});
