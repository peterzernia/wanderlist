import user from '../user'
import { user as userObject } from '../../testVariables'

const defaultState = {
  fetching: false,
  fetched: false,
  fetchingSingleUser: false,
  fetchedSingleUser: false,
  user: { countries: [] },
  singleUser: {},
}

describe('user Reducer', () => {
  it('has a default state', () => {
    expect(user(undefined, { type: 'unexpected' })).toEqual({
      ...defaultState
    })
  });
  it('can handle FETCH_USER_PENDING', () => {
    expect(user(undefined, { type: 'FETCH_USER_PENDING' })).toEqual({
      ...defaultState,
      fetching: true
    })
  });
  it('can handle FETCH_USER_FULFILLED', () => {
    expect(user(undefined, {
      type: 'FETCH_USER_FULFILLED',
      user: userObject
    })).toEqual({
      ...defaultState,
      fetching: false,
      fetched: true,
      user: userObject
    })
  });
  it('can handle FETCH_USER_REJECTED', () => {
    expect(user(undefined, {
      type: 'FETCH_USER_REJECTED'
    })).toEqual({
      ...defaultState,
      fetching: false,
      fetched: false,
    })
  });
  it('can handle PUT_USER_DATA_FULFILLED', () => {
    expect(user(undefined, {
      type: 'PUT_USER_DATA_FULFILLED',
      user: userObject
    })).toEqual({
      ...defaultState,
      user: userObject
    })
  });
  it('can handle FETCH_SINGLE_USER_PENDING', () => {
    expect(user(undefined, {
      type: 'FETCH_SINGLE_USER_PENDING',
    })).toEqual({
      ...defaultState,
      fetchingSingleUser: true
    })
  });
  it('can handle FETCH_SINGLE_USER_FULFILLED', () => {
    expect(user(undefined, {
      type: 'FETCH_SINGLE_USER_FULFILLED',
      user: [userObject]
    })).toEqual({
      ...defaultState,
      fetchingSingleUser: false,
      fetchedSingleUser: true,
      singleUser: userObject
    })
  });
  it('can handle FETCH_SINGLE_USER_REJECTED', () => {
    expect(user(undefined, {
      type: 'FETCH_SINGLE_USER_REJECTED',
    })).toEqual({
      ...defaultState,
      fetchingSingleUser: false,
      fetchedSingleUser: false
    })
  });
  it('can handle AUTH_LOGOUT', () => {
    expect(user(undefined, {
      type: 'AUTH_LOGOUT',
    })).toEqual({
      ...defaultState,
      user: { countries: [] },
    })
  });
});
