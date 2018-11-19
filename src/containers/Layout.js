import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Error from '../components/Error'
import Post from './Post'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import NavBar from '../components/NavBar'
import PrivateRoute from '../components/PrivateRoute'
import Profile from './Profile'
import Register from './Register'
import Search from './Search'
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
          <Route exact path={`${this.props.match.url}`} component={Home}/>
          <Route path={`${this.props.match.url}/search`} component={Search}/>
          <PrivateRoute {...this.props} path={`${this.props.match.url}/post`} component={Post}/>
          <PrivateRoute {...this.props} path={`${this.props.match.url}/profile`} component={Profile}/>
          <Route path={`${this.props.match.url}/login`} component={Login}/>
          <Route path={`${this.props.match.url}/logout`} component={Logout}/>
          <Route path={`${this.props.match.url}/register`} component={Register}/>
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
  authenticated: PropTypes.bool,
  fetching: PropTypes.bool,
  fetchUser: PropTypes.func,
  fetchUserTripReports: PropTypes.func,
  removeError: PropTypes.func
};
