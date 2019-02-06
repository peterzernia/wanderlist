import React from 'react'
import { shallow } from 'enzyme'
import { ForgotPassword } from '../ForgotPassword'

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
