import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
 shape, string, bool, func,
} from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { DotLoader } from 'react-spinners'
import { removeError } from '../actions/errorActions'
import { fetchUser } from '../actions/userActions'
import { authCheckState } from '../actions/authActions'
import { fetchTripReports, fetchFeaturedTripReport, fetchUserTripReports } from '../actions/tripReportActions'

import Error from '../components/Error'
import NavBar from '../components/NavBar'
import PrivateRoute from '../components/PrivateRoute'
import Success from '../components/Success'

import Profile from './Profile'
import Feed from './Feed'
import ForgotPassword from './ForgotPassword'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import Post from './Post'
import Register from './Register'
import Search from './Search'


export function Layout(props) {
  const {
    authenticated,
    error,
    success,
    fetching,
  } = props

  useEffect(() => {
    async function fetchData() {
      await props.authCheckState()
      props.fetchTripReports(`${process.env.REACT_APP_API_URL}/api/v1/reports/?ordering=-pk`)
      props.fetchFeaturedTripReport('rr9IuTcYtL3E')

      const username = localStorage.getItem('username')
      if (username) {
        props.fetchUserTripReports(username)
      }

      if (authenticated) {
        props.fetchUser()
      }
    }

    fetchData()
    // eslint-disable-next-line
  }, [props.authCheckState, authenticated, props.fetchFeaturedTripReport, props.fetchTripReports, props.fetchUser, props.fetchUserTripReports])

  return (
    <Router>
      {!fetching ? (
        <div>
          <NavBar {...props} />
          {/*
          Errors are added if there are server errors, authentication errors,
          errors while posting content, etc. Succeses are added to give users
          feedback when they have successfully added a country to their map,
          deleted a post, etc. The removeError function is run on every
          components Unmount, so that errors and sucesses do not persist
          through navigation. Users can also remove these by clicking the 'x'.
        */}
          {error && <Error {...props} />}
          {success && <Success {...props} />}

          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/feed" component={Feed} />
          <PrivateRoute {...props} path="/profile" component={Profile} />
          <Route path="/u/:username" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/password-reset" component={ForgotPassword} />
          <Route path="/p/:slug" component={Post} />
        </div>
      ) : (
        <div className="centered">
          <DotLoader size={50} color="#2196f3" className="content" />
        </div>
      )}
    </Router>
  )
}

const mapState = (state) => ({
    error: state.error.error,
    success: state.error.success,
    authenticated: state.auth.authenticated,
    fetching: state.user.fetching,
    fetched: state.user.fetched,
  })

const mapDispatch = (dispatch) => bindActionCreators(
    {
      fetchUser,
      removeError,
      authCheckState,
      fetchTripReports,
      fetchFeaturedTripReport,
      fetchUserTripReports,
    },
    dispatch,
  )

export default connect(
  mapState,
  mapDispatch,
)(Layout)

Layout.propTypes = {
  error: shape({}),
  success: string,
  authenticated: bool.isRequired,
  fetching: bool.isRequired,
  fetched: bool.isRequired,
  fetchUser: func.isRequired,
  removeError: func.isRequired,
  authCheckState: func.isRequired,
  fetchTripReports: func.isRequired,
  fetchFeaturedTripReport: func.isRequired,
  fetchUserTripReports: func.isRequired,
}

Layout.defaultProps = {
  error: {},
  success: '',
}
