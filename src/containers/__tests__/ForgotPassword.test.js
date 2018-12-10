import React from 'react'
import { shallow } from 'enzyme'
import { ForgotPassword } from '../ForgotPassword'
import { DotLoader } from 'react-spinners'
import ForgotPasswordForm from '../../components/ForgotPasswordForm'
import { Redirect } from 'react-router-dom'

describe('<ForgotPassword />', () =>{
  let wrapper;
  const e = { preventDefault: jest.fn(), target: { email: { value:'test@test.com'} } };
  const requestPasswordReset = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ForgotPassword requestPasswordReset={requestPasswordReset} />
    )
  });

  it('handleSubmit calls requestPasswordReset', () => {
    wrapper.instance().handleSubmit(e)
    expect(requestPasswordReset).toHaveBeenCalledTimes(1);
  });
});
