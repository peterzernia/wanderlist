import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const NavBar = (props) => {

  const navClass = props.collapsed ? "navbar-collapse collapse" : "navbar-collapse";

  return (
    <nav className="navbar navbar-expand-sm sticky-top navbar-white bg-white">
      <Button color="secondary" component={Link} to="/">Countries</Button>
      <button className="navbar-toggler" type="button" onClick={props.toggleNavBar}>
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={navClass} id="navbarNavAltMarkup">
        <div className="navbar-nav mr-auto">
          <Button color="secondary" component={NavLink} to="/search">Search</Button>
          <Button color="secondary" component={NavLink} to="/post">Trip Reports</Button>
          <Button color="secondary" component={NavLink} to="/map">My Map</Button>
          <Button color="secondary" component={NavLink} to="/profile">Profile</Button>
        </div>
        <div className="navbar-nav ml-auto">
          {
            !props.authenticated
            ? <Button color="secondary" component={NavLink} to="/login">Login</Button>
            : <Button color="secondary" component={NavLink} to="/logout" onClick={props.handleClick}>Logout</Button>
          }
        </div>
      </div>
    </nav>
)};

export default NavBar;


// <AppBar position="static">
//   <Toolbar style={{ flex: 1 }}>
//     <Button component={Link} to='/' color="inherit">Countries</Button>
//     <Button component={NavLink} to='/search' color="inherit">Search</Button>
//     <Button component={NavLink} to='/post' color="inherit">Trip Report</Button>
//     <Button component={NavLink} to='/map' color="inherit">My Map</Button>
//     <Button component={NavLink} to='/profile' color="inherit">Profile</Button>
//     <div>
//       {
//         props.authenticated
//         ? <Button component={NavLink} onClick={props.handleClick} to='/logout' color="inherit">Logout</Button>
//         : <Button component={NavLink} to='/login' color="inherit">Login</Button>
//       }
//     </div>
//   </Toolbar>
// </AppBar>
