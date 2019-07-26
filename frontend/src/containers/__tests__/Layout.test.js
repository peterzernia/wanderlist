import React from "react";
import { shallow } from "enzyme";
import { Layout } from "../Layout";
import { DotLoader } from "react-spinners";
import Error from "../../components/Error";
import Success from "../../components/Success";

describe("<Layout />", () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      fetching: false,
      success: null,
      error: null,
      history: { push: jest.fn() },
      authLogout: jest.fn(),
      authCheckState: jest.fn(),
      fetchTripReports: jest.fn(),
      fetchFeaturedTripReport: jest.fn(),
      fetchUser: jest.fn(),
      authenticated: false
    };
    wrapper = shallow(<Layout {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays loader", () => {
    expect(wrapper.find(DotLoader).length).toEqual(0);
    wrapper.setProps({ fetching: true });
    expect(wrapper.find(DotLoader).length).toEqual(1);
  });
  it("displays error", () => {
    expect(wrapper.find(Error).length).toEqual(0);
    wrapper.setProps({ error: { message: "Network Error" } });
    expect(wrapper.find(Error).length).toEqual(1);
  });
  it("displays success", () => {
    expect(wrapper.find(Success).length).toEqual(0);
    wrapper.setProps({ success: "success" });
    expect(wrapper.find(Success).length).toEqual(1);
  });
  it("calls series of functions", async () => {
    expect(props.authCheckState).toHaveBeenCalledTimes(1);
    expect(props.fetchTripReports).toHaveBeenCalledTimes(1);
    expect(props.fetchFeaturedTripReport).toHaveBeenCalledTimes(1);
    expect(props.fetchUser).toHaveBeenCalledTimes(0);
    jest.clearAllMocks();
    wrapper = await shallow(<Layout {...props} authenticated={true} />);
    expect(props.authCheckState).toHaveBeenCalledTimes(1);
    expect(props.fetchTripReports).toHaveBeenCalledTimes(1);
    expect(props.fetchFeaturedTripReport).toHaveBeenCalledTimes(1);
    expect(props.fetchUser).toHaveBeenCalledTimes(1);
  });
  it("handleClick calls authLogout", () => {
    wrapper.instance().handleClick();
    expect(props.authLogout).toHaveBeenCalledTimes(1);
    expect(props.history.push).toHaveBeenCalledTimes(1);
  });
});
