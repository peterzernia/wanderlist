import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'

const NavBar = (props) => {

  const navClass = props.collapsed ? "navbar-collapse collapse" : "navbar-collapse";

  return (
    <AppBar position="static">
      <Link to="/">Countries</Link>
      <button className="navbar-toggler" type="button" onClick={props.toggleNavBar}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={navClass} id="navbarNavAltMarkup">
        <div className="navbar-nav mr-auto">
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/post">Trip Reports</NavLink>
          <NavLink to="/map">My Map</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </div>
        <div className="navbar-nav ml-auto">
          {
            !props.authenticated
            ? <NavLink className='btn' to="/login">Login</NavLink>
            : <NavLink onClick={props.handleClick} className="btn" to="/logout">Logout</NavLink>
          }
        </div>
      </div>
    </AppBar>
)};

export default NavBar;
