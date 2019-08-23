import * as errorActions from '../errorActions'

describe('Error Action Creators', () => {
  it('should create a REMOVE_ERROR action', () => {
    const expectedAction = { type: 'REMOVE_ERROR' }
    expect(errorActions.removeError()).toEqual(expectedAction)
  })
})
