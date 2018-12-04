import React from 'react'
import { shallow } from 'enzyme'
import EditProfileModal from '../EditProfileModal'
import Dialog from '@material-ui/core/Dialog'

describe('<EditProfileModal />', () =>{
  it('closes modal', () => {
    const closeEditProfileModal = jest.fn();
    const user = { home: { id: 0 } }
    const wrapper = shallow(<EditProfileModal closeEditProfileModal={closeEditProfileModal} showEditProfileModal={true} user={user}/>);
    wrapper.find(Dialog).prop('onClose')(closeEditProfileModal)
    expect(closeEditProfileModal).toHaveBeenCalledTimes(1);
  });
});
