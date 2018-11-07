import React, { Component } from 'react'
import Discover from './Discover'
import Login from './Login'
import Map from './Map'
import NavBar from '../components/NavBar'
import PrivateRoute from '../components/PrivateRoute'
import Profile from './Profile'
import Register from './Register'
import Search from './Search'
import { Route } from "react-router-dom"
import { connect } from 'react-redux'
import { authLogout } from '../actions/authActions'

class Layout extends Component {

  handleClick = () => {
    this.props.authLogout();
    this.props.history.push('/');
  }

  render(){
    return(
      <div>
        <NavBar {...this.props} handleClick={this.handleClick} /><br/>
        <Route exact path={`${this.props.match.url}`} component={Search}/>
        <PrivateRoute authenticated={this.props.authenticated} path={`${this.props.match.url}/discover`} component={Discover}/>
        <PrivateRoute authenticated={this.props.authenticated} path={`${this.props.match.url}/map`} component={Map}/>
        <PrivateRoute authenticated={this.props.authenticated} path={`${this.props.match.url}/profile`} component={Profile}/>
        <Route path={`${this.props.match.url}/login`} component={Login}/>
        <Route path={`${this.props.match.url}/register`} component={Register}/>
      </div>
    )
  }
}

const mapState = state => {
  return {
    authenticated: state.auth.authenticated,
  }
}

const mapDispatch = dispatch => {
  return {
    authLogout: () => dispatch(authLogout())
  }
}

export default connect(mapState, mapDispatch)(Layout);
