import * as tripReportActions from '../tripReportActions'
import { tripReport, tripReport as response } from '../../testVariables'

const tripReports = { results: [tripReport] }

describe('Trip Report Action Creators', () => {
  it('should create a FETCH_TRIP_REPORTS_PENDING action', () => {
    const expectedAction = { type: 'FETCH_TRIP_REPORTS_PENDING' }
    expect(tripReportActions.fetchTripReportsPending()).toEqual(expectedAction)
  })
  it('should create a FETCH_TRIP_REPORTS_FULFILLED action', () => {
    const expectedAction = {
      type: 'FETCH_TRIP_REPORTS_FULFILLED',
      tripReports,
    }
    expect(tripReportActions.fetchTripReportsFulfilled(tripReports)).toEqual(expectedAction)
  })
  it('should create a FETCH_TRIP_REPORTS_REJECTED action', () => {
    const expectedAction = { type: 'FETCH_TRIP_REPORTS_REJECTED' }
    expect(tripReportActions.fetchTripReportsRejected()).toEqual(expectedAction)
  })

  it('should create a FETCH_NEXT_TRIP_REPORTS_PENDING action', () => {
    const expectedAction = { type: 'FETCH_NEXT_TRIP_REPORTS_PENDING' }
    expect(tripReportActions.fetchNextTripReportsPending()).toEqual(expectedAction)
  })
  it('should create a FETCH_NEXT_TRIP_REPORTS_FULFILLED action', () => {
    const expectedAction = {
      type: 'FETCH_NEXT_TRIP_REPORTS_FULFILLED',
      tripReports,
    }
    expect(tripReportActions.fetchNextTripReportsFulfilled(tripReports)).toEqual(expectedAction)
  })
  it('should create a FETCH_NEXT_TRIP_REPORTS_REJECTED action', () => {
    const expectedAction = { type: 'FETCH_NEXT_TRIP_REPORTS_REJECTED' }
    expect(tripReportActions.fetchNextTripReportsRejected()).toEqual(expectedAction)
  })

  it('should create a FETCH_USER_TRIP_REPORTS_PENDING action', () => {
    const expectedAction = { type: 'FETCH_USER_TRIP_REPORTS_PENDING' }
    expect(tripReportActions.fetchUserTripReportsPending()).toEqual(expectedAction)
  })
  it('should create a FETCH_USER_TRIP_REPORTS_FULFILLED action', () => {
    const expectedAction = {
      type: 'FETCH_USER_TRIP_REPORTS_FULFILLED',
      tripReports,
    }
    expect(tripReportActions.fetchUserTripReportsFulfilled(tripReports)).toEqual(expectedAction)
  })
  it('should create a FETCH_USER_TRIP_REPORTS_REJECTED action', () => {
    const expectedAction = { type: 'FETCH_USER_TRIP_REPORTS_REJECTED' }
    expect(tripReportActions.fetchUserTripReportsRejected()).toEqual(expectedAction)
  })

  it('should create a FETCH_NEXT_USER_TRIP_REPORTS_PENDING action', () => {
    const expectedAction = { type: 'FETCH_NEXT_USER_TRIP_REPORTS_PENDING' }
    expect(tripReportActions.fetchNextUserTripReportsPending()).toEqual(expectedAction)
  })
  it('should create a FETCH_NEXT_USER_TRIP_REPORTS_FULFILLED action', () => {
    const expectedAction = {
      type: 'FETCH_NEXT_USER_TRIP_REPORTS_FULFILLED',
      tripReports,
    }
    expect(tripReportActions.fetchNextUserTripReportsFulfilled(tripReports)).toEqual(expectedAction)
  })
  it('should create a FETCH_NEXT_USER_TRIP_REPORTS_REJECTED action', () => {
    const expectedAction = { type: 'FETCH_NEXT_USER_TRIP_REPORTS_REJECTED' }
    expect(tripReportActions.fetchNextUserTripReportsRejected()).toEqual(expectedAction)
  })

  it('should create a FETCH_NEXT_TRIP_REPORTS_PENDING action', () => {
    const expectedAction = { type: 'FETCH_NEXT_TRIP_REPORTS_PENDING' }
    expect(tripReportActions.fetchNextTripReportsPending()).toEqual(expectedAction)
  })
  it('should create a FETCH_NEXT_TRIP_REPORTS_FULFILLED action', () => {
    const expectedAction = {
      type: 'FETCH_NEXT_TRIP_REPORTS_FULFILLED',
      tripReports,
    }
    expect(tripReportActions.fetchNextTripReportsFulfilled(tripReports)).toEqual(expectedAction)
  })
  it('should create a FETCH_NEXT_TRIP_REPORTS_REJECTED action', () => {
    const expectedAction = { type: 'FETCH_NEXT_TRIP_REPORTS_REJECTED' }
    expect(tripReportActions.fetchNextTripReportsRejected()).toEqual(expectedAction)
  })

  it('should create a POST_TRIP_REPORTS_PENDING action', () => {
    const expectedAction = { type: 'POST_TRIP_REPORTS_PENDING' }
    expect(tripReportActions.postTripReportsPending()).toEqual(expectedAction)
  })
  it('should create a POST_TRIP_REPORTS_FULFILLED action', () => {
    const expectedAction = {
      type: 'POST_TRIP_REPORTS_FULFILLED',
      response,
    }
    expect(tripReportActions.postTripReportsFulfilled(response)).toEqual(expectedAction)
  })
  it('should create a POST_TRIP_REPORTS_REJECTED action', () => {
    const expectedAction = { type: 'POST_TRIP_REPORTS_REJECTED' }
    expect(tripReportActions.postTripReportsRejected()).toEqual(expectedAction)
  })

  it('should create a DELETE_TRIP_REPORTS_PENDING action', () => {
    const expectedAction = { type: 'DELETE_TRIP_REPORTS_PENDING' }
    expect(tripReportActions.deleteTripReportsPending()).toEqual(expectedAction)
  })
  it('should create a DELETE_TRIP_REPORTS_FULFILLED action', () => {
    const expectedAction = {
      type: 'DELETE_TRIP_REPORTS_FULFILLED',
      response,
    }
    expect(tripReportActions.deleteTripReportsFulfilled(response)).toEqual(expectedAction)
  })
  it('should create a DELETE_TRIP_REPORTS_REJECTED action', () => {
    const expectedAction = { type: 'DELETE_TRIP_REPORTS_REJECTED' }
    expect(tripReportActions.deleteTripReportsRejected()).toEqual(expectedAction)
  })

  it('should create a UPDATE_TRIP_REPORTS_PENDING action', () => {
    const expectedAction = { type: 'UPDATE_TRIP_REPORTS_PENDING' }
    expect(tripReportActions.updateTripReportsPending()).toEqual(expectedAction)
  })
  it('should create a UPDATE_TRIP_REPORTS_FULFILLED action', () => {
    const expectedAction = {
      type: 'UPDATE_TRIP_REPORTS_FULFILLED',
      response,
    }
    expect(tripReportActions.updateTripReportsFulfilled(response)).toEqual(expectedAction)
  })
  it('should create a UPDATE_TRIP_REPORTS_REJECTED action', () => {
    const expectedAction = { type: 'UPDATE_TRIP_REPORTS_REJECTED' }
    expect(tripReportActions.updateTripReportsRejected()).toEqual(expectedAction)
  })

  it('should create a FETCH_SLUG_TRIP_REPORTS_PENDING action', () => {
    const expectedAction = { type: 'FETCH_SLUG_TRIP_REPORTS_PENDING' }
    expect(tripReportActions.fetchSlugTripReportsPending()).toEqual(expectedAction)
  })
  it('should create a FETCH_SLUG_TRIP_REPORTS_FULFILLED action', () => {
    const expectedAction = {
      type: 'FETCH_SLUG_TRIP_REPORTS_FULFILLED',
      tripReports,
    }
    expect(tripReportActions.fetchSlugTripReportsFulfilled(tripReports)).toEqual(expectedAction)
  })
  it('should create a FETCH_SLUG_TRIP_REPORTS_REJECTED action', () => {
    const expectedAction = { type: 'FETCH_SLUG_TRIP_REPORTS_REJECTED' }
    expect(tripReportActions.fetchSlugTripReportsRejected()).toEqual(expectedAction)
  })

  it('should create a FETCH_FEATURED_TRIP_REPORT_PENDING action', () => {
    const expectedAction = { type: 'FETCH_FEATURED_TRIP_REPORT_PENDING' }
    expect(tripReportActions.fetchFeaturedTripReportPending()).toEqual(expectedAction)
  })
  it('should create a FETCH_FEATURED_TRIP_REPORT_FULFILLED action', () => {
    const expectedAction = {
      type: 'FETCH_FEATURED_TRIP_REPORT_FULFILLED',
      tripReport,
    }
    expect(tripReportActions.fetchFeaturedTripReportFulfilled(tripReport)).toEqual(expectedAction)
  })
  it('should create a FETCH_FEATURED_TRIP_REPORT_REJECTED action', () => {
    const expectedAction = { type: 'FETCH_FEATURED_TRIP_REPORT_REJECTED' }
    expect(tripReportActions.fetchFeaturedTripReportRejected()).toEqual(expectedAction)
  })
})
