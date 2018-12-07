import * as authActions from '../authActions'

describe('Auth Action Creators', () => {
  it('should create a AUTH_START action', () => {
    const expectedAction = {type: 'AUTH_START'}
    expect(authActions.authStart()).toEqual(expectedAction)
  });
  it('should create a AUTH_SUCCESS action', () => {
    const token = '23tnhasu893tnau'
    const expectedAction = {
      type: 'AUTH_SUCCESS',
      token
    }
    expect(authActions.authSuccess(token)).toEqual(expectedAction)
  });
  it('should create a AUTH_FAIL action', () => {
    const expectedAction = {type: 'AUTH_FAIL'}
    expect(authActions.authFail()).toEqual(expectedAction)
  });
  it('should create a AUTH_LOGOUT action', () => {
    const expectedAction = {type: 'AUTH_LOGOUT'}
    expect(authActions.authLogout()).toEqual(expectedAction)
  });
});
