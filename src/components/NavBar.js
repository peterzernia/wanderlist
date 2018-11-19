import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Search from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Place from '@material-ui/icons/Place'
import Message from '@material-ui/icons/Message'

const NavBar = (props) => {

  return (
    <AppBar color="default" position="static">
      <Toolbar>
        <Button style={{ flex: 1, justifyContent: 'left', minWidth: 90 }} component={Link} to='/' color="inherit">Countries</Button>
        <Button component={NavLink} to='/search' color="inherit"><Search /></Button>
        <Button component={NavLink} to='/post' color="inherit"><Message /></Button>
        <Button component={NavLink} to='/map' color="inherit"><Place /></Button>
        <Button component={NavLink} to='/profile' color="inherit"><AccountCircle /></Button>
        {
          props.authenticated
          ? <Button component={NavLink} onClick={props.handleClick} to='/logout' color="inherit">Logout</Button>
          : <Button component={NavLink} to='/login' color="inherit">Login</Button>
        }
      </Toolbar>
    </AppBar>
  )
};

export default NavBar;
