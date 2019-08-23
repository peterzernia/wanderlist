import React, { useState } from 'react'
import { shape, func } from 'prop-types'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'

export default function TripReportThumbnail(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const {
    tripReport,
    openTripReportModal,
    openUpdatePostModal,
    openConfirmDeleteModal,
    match,
  } = props

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card style={{ width: 300, height: 300 }}>
      <CardHeader
        title={tripReport.title}
        action={(
          <IconButton
            onClick={handleClick}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
          >
            <MoreVertIcon />
          </IconButton>
)}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); openTripReportModal(tripReport) }}>
          <LibraryBooksIcon />
        </MenuItem>
        {match.path === '/profile' && <MenuItem onClick={() => { handleClose(); openUpdatePostModal(tripReport) }}><EditIcon /></MenuItem>}
        {match.path === '/profile' && <MenuItem onClick={() => { handleClose(); openConfirmDeleteModal(tripReport) }}><DeleteIcon /></MenuItem>}
      </Menu>
      <CardMedia component="img" src={[...tripReport.countries].sort((a, b) => a.name > b.name)[0].flag} alt="" />
    </Card>
  )
}

TripReportThumbnail.propTypes = {
  tripReport: shape({}).isRequired,
  openTripReportModal: func.isRequired,
  openUpdatePostModal: func.isRequired,
  openConfirmDeleteModal: func.isRequired,
  match: shape({}).isRequired,
}
