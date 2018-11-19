import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Search from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Message from '@material-ui/icons/Message'

const NavBar = (props) => {

  return (
    <div style={{ backgroundColor: '#ffffff'}} >
      <AppBar color='inherit' position="static">
        <Toolbar>
          <Button
            style={{ flex: 1, justifyContent: 'left', minWidth: 90, backgroundColor: 'transparent' }}
            component={Link} to='/'
            color="inherit">
            Countries
          </Button>
          <Button component={Link} to='/search' color="inherit"><Search /></Button>
          <Button component={Link} to='/post' color="inherit"><Message /></Button>
          <Button component={Link} to='/profile' color="inherit"><AccountCircle /></Button>
          {
            props.authenticated
            ? <Button component={Link} to='/logout' color="inherit">Logout</Button>
            : <Button component={Link} to='/login' color="inherit">Login</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
};

export default NavBar;
