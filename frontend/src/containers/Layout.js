import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { removeError } from "../actions/errorActions";
import { fetchUser } from "../actions/userActions";
import { authCheckState } from '../actions/authActions'
import { fetchTripReports, fetchFeaturedTripReport } from '../actions/tripReportActions'

import Error from "../components/Error";
import NavBar from "../components/NavBar";
import PrivateRoute from "../components/PrivateRoute";
import Success from "../components/Success";

import Profile from "./Profile";
import Feed from "./Feed";
import ForgotPassword from "./ForgotPassword";
import Home from "./Home";
import Login from "./Login";
import Logout from "./Logout";
import Post from "./Post";
import PrivacyPolicy from "./PrivacyPolicy";
import Register from "./Register";
import Search from "./Search";

import { DotLoader } from "react-spinners";

export class Layout extends Component {
  async componentDidMount() {
    await this.props.authCheckState();
    this.props.fetchTripReports(`${process.env.REACT_APP_API_URL}/api/v1/reports/?ordering=-pk`);
    this.props.fetchFeaturedTripReport('rr9IuTcYtL3E');

    if (this.props.authenticated) {
      this.props.fetchUser();
    }
  }

  handleClick = () => {
    this.props.authLogout();
    this.props.history.push("/");
  };

  render() {
    return (
      <Router>
        {!this.props.fetching ? (
          <div>
            <NavBar {...this.props} />
            {/*
            Errors are added if there are server errors, authentication errors,
            errors while posting content, etc. Succeses are added to give users
            feedback when they have successfully added a country to their map,
            deleted a post, etc. The removeError function is run on every
            components Unmount, so that errors and sucesses do not persist
            through navigation. Users can also remove these by clicking the 'x'.
          */}
            {this.props.error && <Error {...this.props} error={this.props.error} />}
            {this.props.success && <Success {...this.props} />}

            <Route exact path="/" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/feed" component={Feed} />
            <PrivateRoute {...this.props} path="/profile" component={Profile} />
            <Route path="/u/:username" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/password_reset" component={ForgotPassword} />
            <Route path="/p/:slug" component={Post} />
            <Route path="/privacy" component={PrivacyPolicy} />
          </div>
        ) : (
          <div className="centered">
            <DotLoader size={50} color={"#2196f3"} className="content" />
          </div>
        )}
      </Router>
    );
  }
}

const mapState = state => {
  return {
    error: state.error.error,
    success: state.error.success,
    authenticated: state.auth.authenticated,
    fetching: state.user.fetching,
    fetched: state.user.fetched
  };
};

const mapDispatch = dispatch => {
  return bindActionCreators(
    {
      fetchUser,
      removeError,
      authCheckState,
      fetchTripReports,
      fetchFeaturedTripReport,
    },
    dispatch
  );
};

export default connect(
  mapState,
  mapDispatch
)(Layout);

Layout.propTypes = {
  error: PropTypes.object,
  success: PropTypes.string,
  authenticated: PropTypes.bool,
  fetching: PropTypes.bool,
  fetched: PropTypes.bool,

  fetchUser: PropTypes.func,
  removeError: PropTypes.func,
  authCheckState: PropTypes.func,
  fetchTripReports: PropTypes.func,
  fetchFeaturedTripReport: PropTypes.func,
};
