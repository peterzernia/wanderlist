import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {
  render() {

    /*
    If the route url matches the url for specified routes, that route button
    will recieve the active class, which distinguishes the route the user is on.
    */
    const { location } = this.props;
    const homeClass = location.pathname === '/' ? 'btn navbar-brand active' : 'btn'
    const searchClass = location.pathname === '/search' ? 'btn active' : 'btn'
    const postClass = location.pathname === '/post' ? 'btn active' : 'btn'
    const mapClass = location.pathname === '/map' ? 'btn active' : 'btn'
    const profileClass = location.pathname === '/profile' ? 'btn active' : 'btn'
    const loginClass = location.pathname === '/login' ? 'btn active' : 'btn'
    const navClass = this.props.collapsed ? "navbar-collapse collapse" : "navbar-collapse";

    return (
      <nav className="navbar navbar-expand-sm sticky-top navbar-white bg-white">
        <Link to="/" className={homeClass}>Countries</Link>
        <button className="navbar-toggler" type="button" onClick={this.props.toggleNavBar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={navClass} id="navbarNavAltMarkup">
          <div className="navbar-nav mr-auto">
            <Link className={searchClass} to="/search">Search</Link>
            <Link className={postClass} to="/post">My Posts</Link>
            <Link className={mapClass} to="/map">My Map</Link>
            <Link className={profileClass} to="/profile">Profile</Link>
          </div>
          <div className="navbar-nav ml-auto">
            {
              !this.props.authenticated
              ? <Link className={loginClass} to="/login">Login</Link>
              : <Link onClick={this.props.handleClick} className="btn" to="/logout">Logout</Link>
            }
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;
