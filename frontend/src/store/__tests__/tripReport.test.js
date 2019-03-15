import tripReport from "../tripReport";
import { tripReport as tripReportObject, user } from "../../testVariables";

const defaultState = {
  posting: false,
  updating: false,
  fetching: false,
  fetched: false,
  fetchingNext: false,
  fetchedNext: false,
  fetchingUserNext: false,
  fetchedUserNext: false,
  fetchingTripReports: false,
  fetchedTripReports: false,
  fetchingSlugTripReports: false,
  fetchedSlugTripReports: false,
  fetchingFeaturedTripReport: false,
  fetchedFeaturedTripReport: false,
  tripReports: { results: [], count: null, next: null, previous: null },
  userTripReports: { results: [], count: null, next: null, previous: null },
  slugTripReports: [],
  featuredTripReport: []
};

describe("tripReport Reducer", () => {
  it("has a default state", () => {
    expect(tripReport(undefined, { type: "unexpected" })).toEqual({
      ...defaultState
    });
  });

  it("can handle FETCH_TRIP_REPORTS_PENDING", () => {
    expect(
      tripReport(undefined, { type: "FETCH_TRIP_REPORTS_PENDING" })
    ).toEqual({
      ...defaultState,
      fetching: true
    });
  });

  it("can handle FETCH_TRIP_REPORTS_FULFILLED", () => {
    expect(
      tripReport(undefined, {
        type: "FETCH_TRIP_REPORTS_FULFILLED",
        tripReports: {
          results: [tripReportObject],
          count: 1,
          next: null,
          previous: null
        }
      })
    ).toEqual({
      ...defaultState,
      fetching: false,
      fetched: true,
      tripReports: {
        results: [tripReportObject],
        count: 1,
        next: null,
        previous: null
      }
    });
  });

  it("can handle FETCH_TRIP_REPORTS_REJECTED", () => {
    expect(
      tripReport(undefined, { type: "FETCH_TRIP_REPORTS_REJECTED" })
    ).toEqual({
      ...defaultState,
      fetching: false,
      fetched: false
    });
  });

  it("can handle FETCH_NEXT_TRIP_REPORTS_PENDING", () => {
    expect(
      tripReport(undefined, { type: "FETCH_NEXT_TRIP_REPORTS_PENDING" })
    ).toEqual({
      ...defaultState,
      fetchingNext: true,
      fetchedNext: false
    });
  });

  it("can handle FETCH_NEXT_TRIP_REPORTS_FULFILLED", () => {
    // The fetched trip report gets added to the list of existing trip reports.
    expect(
      tripReport(
        { ...defaultState, tripReports: { results: [tripReportObject] } },
        {
          type: "FETCH_NEXT_TRIP_REPORTS_FULFILLED",
          tripReports: { results: [tripReportObject] }
        }
      )
    ).toEqual({
      ...defaultState,
      fetchingNext: false,
      fetchedNext: true,
      // Here the results array is now two trip reports
      tripReports: {
        results: [tripReportObject, tripReportObject],
        count: undefined,
        next: undefined,
        previous: undefined
      }
    });

    // If the array is empty originally, it still gets added.
    expect(
      tripReport(undefined, {
        type: "FETCH_NEXT_TRIP_REPORTS_FULFILLED",
        tripReports: { results: [tripReportObject] }
      })
    ).toEqual({
      ...defaultState,
      fetchingNext: false,
      fetchedNext: true,
      // Here the results array is now one trip report
      tripReports: {
        results: [tripReportObject],
        count: undefined,
        next: undefined,
        previous: undefined
      }
    });
  });

  it("can handle FETCH_NEXT_TRIP_REPORTS_REJECTED", () => {
    expect(
      tripReport(undefined, { type: "FETCH_NEXT_TRIP_REPORTS_REJECTED" })
    ).toEqual({
      ...defaultState,
      fetchingNext: false,
      fetchedNext: false
    });
  });

  it("can handle FETCH_USER_TRIP_REPORTS_PENDING", () => {
    expect(
      tripReport(undefined, { type: "FETCH_USER_TRIP_REPORTS_PENDING" })
    ).toEqual({
      ...defaultState,
      fetchingTripReports: true,
      fetchedTripReports: false
    });
  });

  it("can handle FETCH_USER_TRIP_REPORTS_FULFILLED", () => {
    expect(
      tripReport(undefined, {
        type: "FETCH_USER_TRIP_REPORTS_FULFILLED",
        tripReports: {
          results: [tripReportObject],
          count: 1,
          next: null,
          previous: null
        }
      })
    ).toEqual({
      ...defaultState,
      fetchingTripReports: false,
      fetchedTripReports: true,
      userTripReports: {
        results: [tripReportObject],
        count: 1,
        next: null,
        previous: null
      }
    });
  });

  it("can handle FETCH_USER_TRIP_REPORTS_REJECTED", () => {
    expect(
      tripReport(undefined, { type: "FETCH_USER_TRIP_REPORTS_REJECTED" })
    ).toEqual({
      ...defaultState,
      fetchingTripReports: false,
      fetchedTripReports: false
    });
  });

  it("can handle FETCH_NEXT_USER_TRIP_REPORTS_PENDING", () => {
    expect(
      tripReport(undefined, { type: "FETCH_NEXT_USER_TRIP_REPORTS_PENDING" })
    ).toEqual({
      ...defaultState,
      fetchingUserNext: true,
      fetchedUserNext: false
    });
  });

  it("can handle FETCH_NEXT_USER_TRIP_REPORTS_FULFILLED", () => {
    // The fetched trip report gets added to the list of existing trip reports.
    expect(
      tripReport(
        { ...defaultState, userTripReports: { results: [tripReportObject] } },
        {
          type: "FETCH_NEXT_USER_TRIP_REPORTS_FULFILLED",
          tripReports: { results: [tripReportObject] }
        }
      )
    ).toEqual({
      ...defaultState,
      fetchingUserNext: false,
      fetchedUserNext: true,
      // Here the results array is now two trip reports
      userTripReports: {
        results: [tripReportObject, tripReportObject],
        count: undefined,
        next: undefined,
        previous: undefined
      }
    });

    // If the array is empty originally, it still gets added.
    expect(
      tripReport(undefined, {
        type: "FETCH_NEXT_USER_TRIP_REPORTS_FULFILLED",
        tripReports: { results: [tripReportObject] }
      })
    ).toEqual({
      ...defaultState,
      fetchingUserNext: false,
      fetchedUserNext: true,
      // Here the results array is now one trip report
      userTripReports: {
        results: [tripReportObject],
        count: undefined,
        next: undefined,
        previous: undefined
      }
    });
  });

  it("can handle FETCH_NEXT_USER_TRIP_REPORTS_REJECTED", () => {
    expect(
      tripReport(undefined, { type: "FETCH_NEXT_USER_TRIP_REPORTS_REJECTED" })
    ).toEqual({
      ...defaultState,
      fetchingUserNext: false,
      fetchedUserNext: false
    });
  });

  it("can handle POST_TRIP_REPORTS_PENDING", () => {
    expect(
      tripReport(undefined, { type: "POST_TRIP_REPORTS_PENDING" })
    ).toEqual({
      ...defaultState,
      posting: true
    });
  });

  it("can handle POST_TRIP_REPORTS_FULFILLED", () => {
    // If the array is empty originally, it gets added.
    expect(
      tripReport(undefined, {
        type: "POST_TRIP_REPORTS_FULFILLED",
        response: tripReportObject
      })
    ).toEqual({
      ...defaultState,
      posting: false,
      userTripReports: {
        results: [tripReportObject],
        count: null,
        next: null,
        previous: null
      },
      tripReports: {
        results: [tripReportObject],
        count: null,
        next: null,
        previous: null
      }
    });
    // If the array is not empty, the new trip report must be added and sorted.
    const tripReportOne = { ...tripReport, pk: 1 };
    expect(
      tripReport(
        {
          // Original state
          ...defaultState,
          userTripReports: { results: [tripReportOne] },
          tripReports: { results: [tripReportOne] }
        },
        {
          type: "POST_TRIP_REPORTS_FULFILLED",
          response: tripReportObject
        }
      )
    ).toEqual({
      ...defaultState,
      posting: false,
      userTripReports: {
        results: [tripReportOne, tripReportObject],
        count: undefined,
        next: undefined,
        previous: undefined
      },
      tripReports: {
        results: [tripReportOne, tripReportObject],
        count: undefined,
        next: undefined,
        previous: undefined
      }
    });
  });

  it("can handle POST_TRIP_REPORTS_REJECTED", () => {
    expect(
      tripReport(undefined, { type: "POST_TRIP_REPORTS_REJECTED" })
    ).toEqual({
      ...defaultState,
      posting: false
    });
  });

  it("can handle DELETE_TRIP_REPORTS_FULFILLED", () => {
    expect(
      tripReport(
        {
          // Set default state
          ...defaultState,
          userTripReports: { results: [tripReportObject] },
          tripReports: { results: [tripReportObject] }
        },
        {
          type: "DELETE_TRIP_REPORTS_FULFILLED",
          response: tripReportObject
        }
      )
    ).toEqual({
      ...defaultState,
      // The deleted trip report is removed from the results array.
      userTripReports: {
        results: [],
        count: undefined,
        next: undefined,
        previous: undefined
      },
      tripReports: {
        results: [],
        count: undefined,
        next: undefined,
        previous: undefined
      }
    });
  });

  it("can handle UPDATE_TRIP_REPORTS_PENDING", () => {
    expect(
      tripReport(undefined, { type: "UPDATE_TRIP_REPORTS_PENDING" })
    ).toEqual({
      ...defaultState,
      updating: true
    });
  });

  it("can handle UPDATE_TRIP_REPORTS_FULFILLED", () => {
    const updatedTripReport = { ...tripReportObject, title: "updated" };
    const otherTripReport = { ...tripReportObject, id: 1 };
    expect(
      tripReport(
        {
          // Set default state
          ...defaultState,
          userTripReports: { results: [tripReportObject, otherTripReport] },
          tripReports: { results: [tripReportObject, otherTripReport] }
        },
        {
          type: "UPDATE_TRIP_REPORTS_FULFILLED",
          response: updatedTripReport
        }
      )
    ).toEqual({
      ...defaultState,
      updating: false,
      // The update trip report is added to the results array.
      userTripReports: {
        results: [updatedTripReport, otherTripReport],
        count: undefined,
        next: undefined,
        previous: undefined
      },
      tripReports: {
        results: [updatedTripReport, otherTripReport],
        count: undefined,
        next: undefined,
        previous: undefined
      }
    });
  });

  it("can handle UPDATE_TRIP_REPORTS_REJECTED", () => {
    expect(
      tripReport(undefined, { type: "UPDATE_TRIP_REPORTS_REJECTED" })
    ).toEqual({
      ...defaultState,
      updating: false
    });
  });

  it("can handle FETCH_SLUG_TRIP_REPORTS_PENDING", () => {
    expect(
      tripReport(undefined, { type: "FETCH_SLUG_TRIP_REPORTS_PENDING" })
    ).toEqual({
      ...defaultState,
      fetchingSlugTripReports: true,
      fetchedSlugTripReports: false
    });
  });

  it("can handle FETCH_SLUG_TRIP_REPORTS_FULFILLED", () => {
    expect(
      tripReport(undefined, {
        type: "FETCH_SLUG_TRIP_REPORTS_FULFILLED",
        tripReports: { results: tripReportObject }
      })
    ).toEqual({
      ...defaultState,
      fetchingSlugTripReports: false,
      fetchedSlugTripReports: true,
      slugTripReports: tripReportObject
    });
  });

  it("can handle FETCH_SLUG_TRIP_REPORTS_REJECTED", () => {
    expect(
      tripReport(undefined, { type: "FETCH_SLUG_TRIP_REPORTS_REJECTED" })
    ).toEqual({
      ...defaultState,
      fetchingSlugTripReports: false,
      fetchedSlugTripReports: false
    });
  });

  it("can handle FETCH_FEATURED_TRIP_REPORT_PENDING", () => {
    expect(
      tripReport(undefined, { type: "FETCH_FEATURED_TRIP_REPORT_PENDING" })
    ).toEqual({
      ...defaultState,
      fetchingFeaturedTripReport: true,
      fetchedFeaturedTripReport: false
    });
  });

  it("can handle FETCH_FEATURED_TRIP_REPORT_FULFILLED", () => {
    expect(
      tripReport(undefined, {
        type: "FETCH_FEATURED_TRIP_REPORT_FULFILLED",
        tripReport: { results: tripReportObject }
      })
    ).toEqual({
      ...defaultState,
      fetchingFeaturedTripReport: false,
      fetchedFeaturedTripReport: true,
      featuredTripReport: tripReportObject
    });
  });

  it("can handle FETCH_FEATURED_TRIP_REPORT_REJECTED", () => {
    expect(
      tripReport(undefined, { type: "FETCH_FEATURED_TRIP_REPORT_REJECTED" })
    ).toEqual({
      ...defaultState,
      fetchingFeaturedTripReport: false,
      fetchedFeaturedTripReport: false
    });
  });

  it("can handle TOGGLE_FAVORITE_FULFILLED", () => {
    const favoritedTripReport = { ...tripReportObject, favoriters: [1] };
    // Test otherTripReport will not change.
    const otherTripReport = { ...tripReportObject, id: 1 };
    expect(
      tripReport(
        {
          // Set default state.
          ...defaultState,
          tripReports: {
            results: [tripReportObject, otherTripReport],
            count: null,
            next: null,
            previous: null
          },
          slugTripReports: [tripReportObject],
          featuredTripReport: [tripReportObject]
        },
        {
          type: "TOGGLE_FAVORITE_FULFILLED",
          response: favoritedTripReport
        }
      )
    ).toEqual({
      ...defaultState,
      // The favorited list trip report is removed from the results array.
      slugTripReports: [favoritedTripReport],
      tripReports: {
        results: [favoritedTripReport, otherTripReport],
        count: null,
        next: null,
        previous: null
      },
      featuredTripReport: [favoritedTripReport]
    });
    // If featured and trip report is not favorited they are not changed.
    expect(
      tripReport(
        {
          // Set default state.
          ...defaultState,
          featuredTripReport: [otherTripReport],
          slugTripReports: [otherTripReport]
        },
        {
          type: "TOGGLE_FAVORITE_FULFILLED",
          response: favoritedTripReport
        }
      )
    ).toEqual({
      ...defaultState,
      // The favorited list trip report is removed from the results array.
      slugTripReports: [otherTripReport],
      featuredTripReport: [otherTripReport]
    });
  });

  it("can handle PUT_USER_DATA_FULFILLED", () => {
    const updatedUser = { ...user, username: "Updated", pk: 24 };
    const updatedTripReport = { ...tripReportObject, author: updatedUser };
    // Make another post with a different author id, to test other posts NOT getting change.
    const otherUser = { ...user, pk: 1 };
    const otherTripReport = { ...tripReportObject, id: 1, author: otherUser };
    expect(
      tripReport(
        {
          // Set default state.
          ...defaultState,
          tripReports: {
            results: [tripReportObject, otherTripReport],
            count: null,
            next: null,
            previous: null
          }
        },
        {
          type: "PUT_USER_DATA_FULFILLED",
          user: updatedUser
        }
      )
    ).toEqual({
      ...defaultState,
      tripReports: {
        results: [updatedTripReport, otherTripReport],
        count: null,
        next: null,
        previous: null
      }
    });
  });

  it("can handle AUTH_LOGOUT", () => {
    expect(tripReport(undefined, { type: "AUTH_LOGOUT" })).toEqual({
      ...defaultState,
      userTripReports: { results: [], count: null, next: null, previous: null }
    });
  });
});
