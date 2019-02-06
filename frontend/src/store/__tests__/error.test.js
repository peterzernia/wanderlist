import error from '../error'

const defaultState = {
  error: null,
  success: null,
}

describe('error Reducer', () => {
  it('has a default state', () => {
    expect(error(undefined, { type: 'unexpected' })).toEqual({
      ...defaultState
    })
  });
  it('can handle ADD_ERROR', () => {
    expect(error(undefined, {
      type: 'ADD_ERROR',
      error: 'Error'
    })).toEqual({
      ...defaultState,
      error: 'Error'
    })
  });
  it('can handle REMOVE_ERROR', () => {
    expect(error(undefined, {
      type: 'REMOVE_ERROR'
    })).toEqual({
      error: null,
      success: null
    })
  });
  it('can handle ADD_SUCCESS', () => {
    expect(error(undefined, {
      type: 'ADD_SUCCESS',
      success: 'Success'
    })).toEqual({
      ...defaultState,
      success: 'Success'
    })
  });
});
