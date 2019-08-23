import React from 'react'
import { bool } from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ListIcon from '@material-ui/icons/FormatListBulleted'
import Tooltip from '@material-ui/core/Tooltip'

const NavBar = ({ authenticated }) => (
  <div style={{ backgroundColor: '#ffffff' }}>
    <AppBar color="inherit" position="static">
      <Toolbar style={{ padding: 0 }}>
        <Button
          style={{
            flex: 1, justifyContent: 'left', minWidth: 90, backgroundColor: 'transparent',
          }}
          component={Link}
          to="/"
          color="inherit"
        >
            Wanderlist
        </Button>
        <Tooltip title="Trip Report Feed">
          <Button component={Link} to="/feed" color="inherit"><ListIcon /></Button>
        </Tooltip>
        <Tooltip title="Search for Countries">
          <Button component={Link} to="/search" color="inherit"><SearchIcon /></Button>
        </Tooltip>
        <Tooltip title="My Profile">
          <Button component={Link} to="/profile" color="inherit"><AccountCircleIcon /></Button>
        </Tooltip>
        {
            authenticated
            ? <Button component={Link} to="/logout" color="inherit">Logout</Button>
            : <Button component={Link} to="/login" color="inherit">Login</Button>
          }
      </Toolbar>
    </AppBar>
  </div>
  )

export default NavBar

NavBar.propTypes = {
  authenticated: bool.isRequired,
}
