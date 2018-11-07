import React, { Component } from 'react'
import Discover from './Discover'
import Login from './Login'
import Logout from './Logout'
import Map from './Map'
import NavBar from '../components/NavBar'
import Profile from './Profile'
import Register from './Register'
import Search from './Search'
import { Route } from "react-router-dom"

class Layout extends Component {
  render(){
    return(
      <div>
        <NavBar /><br/>
        <Route exact path={`${this.props.match.url}`} component={Search}/>
        <Route path={`${this.props.match.url}/discover`} component={Discover}/>
        <Route path={`${this.props.match.url}/map`} component={Map}/>
        <Route path={`${this.props.match.url}/profile`} component={Profile}/>
        <Route path={`${this.props.match.url}/login`} component={Login}/>
        <Route path={`${this.props.match.url}/logout`} component={Logout}/>
        <Route path={`${this.props.match.url}/register`} component={Register}/>
      </div>
    )
  }
}

export default Layout;
