import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Error from '../components/Error'
import Feed from './Feed'
import ForgotPassword from './ForgotPassword'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import NavBar from '../components/NavBar'
import Post from './Post'
import PrivateRoute from '../components/PrivateRoute'
import Profile from './Profile'
import Register from './Register'
import Search from './Search'
import Success from '../components/Success'
import { Route } from "react-router-dom"
import { connect } from 'react-redux'
import { removeError } from '../actions/errorActions'
import { fetchUser } from '../actions/userActions'
import { fetchUserTripReports } from '../actions/tripReportActions'
import { DotLoader } from 'react-spinners'

class Layout extends Component {

  componentWillMount() {
    if (this.props.authenticated) {
      this.props.fetchUser();
      this.props.fetchUserTripReports(localStorage.getItem('username'));
    }
  }

  handleClick = () => {
    this.props.authLogout();
    this.props.history.push('/');
  }

  render(){

    return(
      <div>
      {
        !this.props.fetching
        ?<div>
          <NavBar {...this.props} />
          {this.props.error && <Error {...this.props} error={this.props.error} />}
          {this.props.success && <Success {...this.props} />}
          <Route exact path='/' component={Home}/>
          <Route path='/search'component={Search}/>
          <Route path='/feed'component={Feed}/>
          <PrivateRoute {...this.props} path='/profile' component={Profile}/>
          <Route path='/login' component={Login}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/register' component={Register}/>
          <Route path='/password_reset' component={ForgotPassword}/>
          <Route path='/p/:slug' component={Post}/>
        </div>
        :<div className='centered'><DotLoader size={50} color={'#2196f3'} className="content" /></div>
      }
      </div>
    )
  }
}

const mapState = state => {
  return {
    error: state.error.error,
    success: state.error.success,
    authenticated: state.auth.authenticated,
    fetching: state.user.fetching,
    fetched: state.user.fetched,
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    fetchUser,
    fetchUserTripReports,
    removeError
  }, dispatch)
}

export default connect(mapState, mapDispatch)(Layout);

Layout.propTypes = {
  error: PropTypes.object,
  success: PropTypes.string,
  authenticated: PropTypes.bool,
  fetching: PropTypes.bool,
  fetchUser: PropTypes.func,
  fetchUserTripReports: PropTypes.func,
  removeError: PropTypes.func
};
