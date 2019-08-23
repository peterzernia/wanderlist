import * as userActions from '../userActions'
import { user } from '../../testVariables'

describe('User Action Creators', () => {
  it('should create a FETCH_USER_PENDING action', () => {
    const expectedAction = { type: 'FETCH_USER_PENDING' }
    expect(userActions.fetchUserPending()).toEqual(expectedAction)
  })
  it('should create a FETCH_USER_FULFILLED action', () => {
    const expectedAction = {
      type: 'FETCH_USER_FULFILLED',
      user,
    }
    expect(userActions.fetchUserFulfilled(user)).toEqual(expectedAction)
  })
  it('should create a FETCH_USER_REJECTED action', () => {
    const expectedAction = { type: 'FETCH_USER_REJECTED' }
    expect(userActions.fetchUserRejected()).toEqual(expectedAction)
  })
  it('should create a PUT_USER_DATA_FULFILLED action', () => {
    const expectedAction = {
      type: 'PUT_USER_DATA_FULFILLED',
      user,
    }
    expect(userActions.putUserDataFulfilled(user)).toEqual(expectedAction)
  })
  it('should create a PUT_USER_DATA_REJECTED action', () => {
    const expectedAction = { type: 'PUT_USER_DATA_REJECTED' }
    expect(userActions.putUserDataRejected()).toEqual(expectedAction)
  })
  it('should create a FETCH_SINGLE_USER_PENDING action', () => {
    const expectedAction = { type: 'FETCH_SINGLE_USER_PENDING' }
    expect(userActions.fetchSingleUserPending()).toEqual(expectedAction)
  })
  it('should create a FETCH_SINGLE_USER_FULFILLED action', () => {
    const expectedAction = {
      type: 'FETCH_SINGLE_USER_FULFILLED',
      user,
    }
    expect(userActions.fetchSingleUserFulfilled(user)).toEqual(expectedAction)
  })
  it('should create a FETCH_SINGLE_USER_REJECTED action', () => {
    const expectedAction = { type: 'FETCH_SINGLE_USER_REJECTED' }
    expect(userActions.fetchSingleUserRejected()).toEqual(expectedAction)
  })
})
