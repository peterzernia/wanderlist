import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

class TripReportThumbnail extends Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {

    const { anchorEl } = this.state;

    return(
      <Card style={{ width: 300, height: 300}}>
        <CardHeader title={this.props.tripReport.title}
        action={
            <IconButton
              onClick={this.handleClick}
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
            >
              <MoreVertIcon />
            </IconButton>
          }/>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={() => {this.handleClose(); }}>Open</MenuItem>
            <MenuItem onClick={() => {this.handleClose(); this.props.openUpdatePostModal(this.props.tripReport);}}>Update</MenuItem>
            <MenuItem onClick={() => {this.handleClose(); this.props.openConfirmDeleteModal(this.props.tripReport);}}>Delete</MenuItem>
          </Menu>
        <CardMedia component='img' src={this.props.tripReport.countries[0].flag} alt="" width="800"/>
      </Card>
    )
  }
};

export default TripReportThumbnail;
