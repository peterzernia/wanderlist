import React, { useState } from 'react'
import { shape, bool, func, arrayOf } from 'prop-types'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Tooltip from '@material-ui/core/Tooltip'

export default function Results(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const {
    country,
    authenticated,
    userCountries,
    openNotAuthModal,
    openCountryModal,
    handleClick
  } = props

  const handleOpen = e => {
    setAnchorEl(e.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  return(
    <Card style={{maxWidth: 400, margin: '0 auto'}}>
      <CardHeader
        style={{ marginLeft: 24 }}
        action={
          <IconButton
            onClick={handleOpen}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={country.name} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/*
          Maps userCountries into an array of just the country names, then
          checks if the Result country name is in the array. If it is, it
          displays the Remove Button, if it is not, it displays the Add
          Button. If no user is authenticated, neither button will show.
        */}
        {
          (authenticated && ![...userCountries].map(country => country.name).includes(country.name))
          && (
            <Tooltip title='Add To My Map'>
              <MenuItem onClick={(e) => {handleClose(); handleClick(e);}} value={country.name} id={country.id}>
                <AddCircleIcon style={{margin: '0 auto'}}/>
              </MenuItem>
            </Tooltip>
          )
        }
        {
          (authenticated && [...userCountries].map(country => country.name).includes(country.name))
          && (
            <Tooltip title='Remove From My Map'>
              <MenuItem onClick={(e) => {handleClose(); handleClick(e);}} value={country.name} id={country.id}>
                <RemoveCircleIcon style={{margin: '0 auto'}}/>
              </MenuItem>
            </Tooltip>
          )
        }
        {/*
        If user is not authenticated, Add button shows the Not Authenticated
        Modal instead.
        */}
        {
          !authenticated
          && (
              <MenuItem onClick={() => openNotAuthModal()} value={country.name} id={country.id}>
                <Tooltip title='Add To My Map'>
                  <AddCircleIcon style={{margin: '0 auto'}}/>
                </Tooltip>
              </MenuItem>
          )
        }
        <MenuItem onClick={() => {handleClose(); openCountryModal(country);}}>More Info</MenuItem>
      </Menu>
      <CardMedia component='img' src={country.flag} alt="" width="400"/>
    </Card>
  )
}

Results.propTypes = {
  country: shape({}),
  authenticated: bool,
  userCountries: arrayOf(shape({})),
  openNotAuthModal: func,
  openCountryModal: func,
  handleClick: func,
}