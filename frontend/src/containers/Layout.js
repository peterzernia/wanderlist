import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Discover from './Discover'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import Map from './Map'
import NavBar from '../components/NavBar'
import PrivateRoute from '../components/PrivateRoute'
import Profile from './Profile'
import Register from './Register'
import Search from './Search'
import { Route } from "react-router-dom"
import { connect } from 'react-redux'
import { authLogout } from '../actions/authActions'
import { toggleNavBar } from '../actions/navbarActions'

class Layout extends Component {

  handleClick = () => {
    this.props.authLogout();
    this.props.history.push('/');
  }

  render(){
    return(
      <div>
        <NavBar {...this.props} handleClick={this.handleClick} /><br/>
        <Route exact path={`${this.props.match.url}`} component={Home}/>
        <Route path={`${this.props.match.url}/search`} component={Search}/>
        <PrivateRoute {...this.props} path={`${this.props.match.url}/discover`} component={Discover}/>
        <PrivateRoute {...this.props} path={`${this.props.match.url}/map`} component={Map}/>
        <PrivateRoute {...this.props} path={`${this.props.match.url}/profile`} component={Profile}/>
        <Route path={`${this.props.match.url}/login`} component={Login}/>
        <Route path={`${this.props.match.url}/logout`} component={Logout}/>
        <Route path={`${this.props.match.url}/register`} component={Register}/>
      </div>
    )
  }
}

const mapState = state => {
  return {
    authenticated: state.auth.authenticated,
    collapsed: state.navbar.collapsed
  }
}

const mapDispatch = dispatch => {
  return {
    authLogout: () => dispatch(authLogout()),
    toggleNavBar: () => dispatch(toggleNavBar())
  }
}

export default connect(mapState, mapDispatch)(Layout);

Layout.propTypes = {
  authenticated: PropTypes.bool,
  collapsed: PropTypes.bool,
  authLogout: PropTypes.func,
  toggleNavBar: PropTypes.func
};
