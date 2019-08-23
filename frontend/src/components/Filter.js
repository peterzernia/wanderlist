import React, { useState } from 'react'
import { func } from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

export default function Filter(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const { handleSubmit, handleTopClick, handleNewestClick } = props

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }


  return (
    <div style={{ textAlign: 'left' }}>
      <IconButton
        onClick={handleClick}
        aria-owns={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/*
        Filter Menu contains a form to filter Trip Reports by country or
        author and another two buttons to filter by the newest and top
        (highest favorite count) Trip Reports.
        */}
        <MenuItem style={{ background: 'transparent' }}>
          <form onSubmit={(e) => { handleClose(); handleSubmit(e) }}>
            <TextField style={{ maxWidth: 250 }} type="text" name="filter" placeholder="Author or Country" />
            <Button variant="contained" color="primary" size="small" type="submit">
              Filter
            </Button>
          </form>
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); handleTopClick() }}>Top</MenuItem>
        <MenuItem onClick={() => { handleClose(); handleNewestClick() }}>Newest</MenuItem>
      </Menu>
    </div>
  )
}

Filter.propTypes = {
  handleSubmit: func.isRequired,
  handleTopClick: func.isRequired,
  handleNewestClick: func.isRequired,
}
