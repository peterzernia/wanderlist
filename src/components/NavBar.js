import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'

class NavBar extends Component {
  render() {

    const navClass = this.props.collapsed ? "navbar-collapse collapse" : "navbar-collapse";

    return (
      <nav className="navbar navbar-expand-sm sticky-top navbar-white bg-white">
        <Link to="/" className='btn navbar-brand'>Countries</Link>
        <button className="navbar-toggler" type="button" onClick={this.props.toggleNavBar}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={navClass} id="navbarNavAltMarkup">
          <div className="navbar-nav mr-auto">
            <NavLink className='btn' to="/search">Search</NavLink>
            <NavLink className='btn' to="/post">Trip Reports</NavLink>
            <NavLink className='btn' to="/map">My Map</NavLink>
            <NavLink className='btn' to="/profile">Profile</NavLink>
          </div>
          <div className="navbar-nav ml-auto">
            {
              !this.props.authenticated
              ? <NavLink className='btn' to="/login">Login</NavLink>
              : <NavLink onClick={this.props.handleClick} className="btn" to="/logout">Logout</NavLink>
            }
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;
