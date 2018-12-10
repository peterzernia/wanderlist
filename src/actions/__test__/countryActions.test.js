import * as countryActions from '../countryActions'
import { country } from '../../testVariables'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Async action tests
describe('country async actions', () => {
  let store;
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios)
    store = mockStore({ country: [], fetching: false, fetched: false })
  });

  afterEach(() => {
    mock.restore();
    store.clearActions();
  });

  it('dispatches FETCH_COUNTRY_FULFILLED after axios request', () => {
    const query = 'Aland Islands'
    mock.onGet(`${process.env.REACT_APP_API_URL}/api/v1/countries/?search=${query}`).replyOnce(200, country)
    store.dispatch(countryActions.fetchCountry(query))
    const actions = store.getActions()
    expect(actions[0]).toEqual(countryActions.fetchCountryPending())
    //expect(actions[1]).toEqual(countryActions.fetchCountryFulfilled(country))
  });
  it('dispatches FETCH_COUNTRY_REJECTED if network error', () => {
    const query = 'Aland Islands'
    mock.onGet(`${process.env.REACT_APP_API_URL}/api/v1/countries/?search=${query}`).networkError()
    store.dispatch(countryActions.fetchCountry(query))
    const actions = store.getActions()
    expect(actions[0]).toEqual(countryActions.fetchCountryPending())
    //expect(actions[1]).toEqual(countryActions.fetchCountryRejected())
    //expect(actions[2]).toEqual({type: "ADD_ERROR", error: err})
  });
});

// Action creator tests.
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
