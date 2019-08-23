import auth from '../auth'

const defaultState = {
  token: null,
  authenticating: false,
  authenticated: false,
}

describe('auth Reducer', () => {
  it('has a default state', () => {
    expect(auth(undefined, { type: 'unexpected' })).toEqual({
      ...defaultState,
    })
  })
  it('can handle AUTH_START', () => {
    expect(auth(undefined, { type: 'AUTH_START' })).toEqual({
      ...defaultState,
      authenticating: true,
    })
  })
  it('can handle AUTH_SUCCESS', () => {
    expect(auth(undefined, {
      type: 'AUTH_SUCCESS',
      token: 'a9f3709aaa085cb74a764006b3ba432505ebaffe',
    })).toEqual({
      ...defaultState,
      authenticating: false,
      authenticated: true,
      token: 'a9f3709aaa085cb74a764006b3ba432505ebaffe',
    })
  })
  it('can handle AUTH_FAIL', () => {
    expect(auth(undefined, {
      type: 'AUTH_FAIL',
    })).toEqual({
      ...defaultState,
      authenticating: false,
      authenticated: false,
    })
  })
  it('can handle AUTH_LOGOUT', () => {
    expect(auth(undefined, {
      type: 'AUTH_LOGOUT',
    })).toEqual({
      ...defaultState,
      authenticating: false,
      authenticated: false,
      token: null,
    })
  })
})
