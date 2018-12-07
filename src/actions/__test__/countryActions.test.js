import * as countryActions from '../countryActions'
import country from '../../testVariables'

describe('Country Action Creators', () => {
  it('should create a FETCH_COUNTRY_PENDING action', () => {
    const expectedAction = {type: 'FETCH_COUNTRY_PENDING'}
    expect(countryActions.fetchCountryPending()).toEqual(expectedAction)
  });
  it('should create a FETCH_COUNTRY_FULFILLED action', () => {
    const expectedAction = {
      type: 'FETCH_COUNTRY_FULFILLED',
      country
    }
    expect(countryActions.fetchCountryFulfilled(country)).toEqual(expectedAction)
  });
  it('should create a FETCH_COUNTRY_REJECTED action', () => {
    const expectedAction = {type: 'FETCH_COUNTRY_REJECTED'}
    expect(countryActions.fetchCountryRejected()).toEqual(expectedAction)
  });
});
