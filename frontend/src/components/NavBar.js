import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {
  render() {

    /*
    If the route url matches the url for specified routes, that route button
    will recieve the active class, which distinguishes the route the user is on.
    */
    const { location } = this.props;
    const searchClass = location.pathname === '/' ? 'btn active' : 'btn'
    const discoverClass = location.pathname === '/discover' ? 'btn active' : 'btn'
    const mapClass = location.pathname === '/map' ? 'btn active' : 'btn'
    const profileClass = location.pathname === '/profile' ? 'btn active' : 'btn'
    const loginClass = location.pathname === '/login' ? 'btn active' : 'btn'
    const navClass = this.props.collapsed ? "navbar-collapse collapse" : "navbar-collapse";

    return (
      <nav className="navbar navbar-expand-sm sticky-top navbar-white bg-white">
        <Link to="/" className='btn navbar-brand'>Countries</Link>
        <button className="navbar-toggler" type="button" onClick={this.props.toggleNavBar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={navClass} id="navbarNavAltMarkup">
          <div className="navbar-nav mr-auto">
            <Link onClick={this.props.toggleNavBar} className={searchClass} to="/">Search</Link>
            <Link onClick={this.props.toggleNavBar}  className={discoverClass} to="/discover">Discover</Link>
            <Link onClick={this.props.toggleNavBar}  className={mapClass} to="/map">My Map</Link>
            <Link onClick={this.props.toggleNavBar}  className={profileClass} to="/profile">Profile</Link>
          </div>
          <div className="navbar-nav ml-auto">
            {
              !this.props.authenticated
              ? <Link onClick={this.props.toggleNavBar}  className={loginClass} to="/login">Login</Link>
              : <Link onClick={(event) => { this.props.handleClick(); this.props.toggleNavBar();}} className="btn" to="/logout">Logout</Link>
            }
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;
