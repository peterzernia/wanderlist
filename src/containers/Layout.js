import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Post from './Post'
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
import { DotLoader } from 'react-spinners'

class Layout extends Component {

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
          <NavBar {...this.props} handleClick={this.handleClick} /><br/>
          <Route exact path={`${this.props.match.url}`} component={Home}/>
          <Route path={`${this.props.match.url}/search`} component={Search}/>
          <PrivateRoute {...this.props} path={`${this.props.match.url}/post`} component={Post}/>
          <PrivateRoute {...this.props} path={`${this.props.match.url}/map`} component={Map}/>
          <PrivateRoute {...this.props} path={`${this.props.match.url}/profile`} component={Profile}/>
          <Route path={`${this.props.match.url}/login`} errorMessage={this.errorMessage} component={Login}/>
          <Route path={`${this.props.match.url}/logout`} component={Logout}/>
          <Route path={`${this.props.match.url}/register`} errorMessage={this.errorMessage} component={Register}/>
        </div>
        :<div className='centered'><DotLoader size={50} color={'#66bb6a'} className="content" /></div>
      }
      </div>
    )
  }
}

const mapState = state => {
  return {
    authenticated: state.auth.authenticated,
    fetching: state.user.fetching,
    fetched: state.user.fetched,
    collapsed: state.navbar.collapsed
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    authLogout,
    toggleNavBar
  }, dispatch)
}

export default connect(mapState, mapDispatch)(Layout);

Layout.propTypes = {
  authenticated: PropTypes.bool,
  fetching: PropTypes.bool,
  collapsed: PropTypes.bool,
  authLogout: PropTypes.func,
  toggleNavBar: PropTypes.func
};
