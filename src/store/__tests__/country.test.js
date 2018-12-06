import country from '../country'
import { country as countryObject } from '../../testVariables'

const defaultState = {
  fetching: false,
  fetched: false,
  country: [],
}

describe('country Reducer', () => {
  it('has a default state', () => {
    expect(country(undefined, { type: 'unexpected'} )).toEqual({
      ...defaultState
    })
  });
  it('can handle FETCH_COUNTRY_PENDING', () => {
    expect(country(undefined, { type: 'FETCH_COUNTRY_PENDING'} )).toEqual({
      ...defaultState,
      fetching: true,
      fetched: false,
    })
  });
  it('can handle FETCH_COUNTRY_FULFILLED', () => {
    expect(country(undefined, {
      type: 'FETCH_COUNTRY_FULFILLED',
      country: countryObject
    } )).toEqual({
      ...defaultState,
      fetching: false,
      fetched: true,
      country: countryObject
    })
  });
  it('can handle FETCH_COUNTRY_REJECTED', () => {
    expect(country(undefined, { type: 'FETCH_COUNTRY_REJECTED' } )).toEqual({
      ...defaultState,
      fetching: false,
      fetched: false
    })
  });
});
