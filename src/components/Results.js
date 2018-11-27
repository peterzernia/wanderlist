import React from 'react'
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

class Results extends React.Component {

  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render(){

    const { anchorEl } = this.state;

    return(
      <Card style={{maxWidth: 400, margin: '0 auto'}}>
        <CardHeader
          style={{ marginLeft: 24 }}
          action={
            <IconButton
              onClick={this.handleClick}
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.country.name} />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {/*
            Maps userCountries into an array of just the country names, then
            checks if the Result country name is in the array. If it is, it
            displays the Remove Button, if it is not, it displays the Add
            Button. If no user is authenticated, neither button will show.
          */}
          {
            (this.props.authenticated && ![...this.props.userCountries].map(country => country.name).includes(this.props.country.name))
            && (
              <Tooltip title='Add To My Map'>
                <MenuItem onClick={(e) => {this.handleClose(); this.props.handleClick(e);}} value={this.props.country.name} id={this.props.country.id}>
                  <AddCircleIcon style={{margin: '0 auto'}}/>
                </MenuItem>
              </Tooltip>
            )
          }
          {
            (this.props.authenticated && [...this.props.userCountries].map(country => country.name).includes(this.props.country.name))
            && (
              <Tooltip title='Remove From My Map'>
                <MenuItem onClick={(e) => {this.handleClose(); this.props.handleClick(e);}} value={this.props.country.name} id={this.props.country.id}>
                  <RemoveCircleIcon style={{margin: '0 auto'}}/>
                </MenuItem>
              </Tooltip>
            )
          }
          <MenuItem onClick={() => {this.handleClose(); this.props.openCountryModal(this.props.country);}}>More Info</MenuItem>
        </Menu>
        <CardMedia component='img' src={this.props.country.flag} alt="" width="400"/>
      </Card>
    )};
}

export default Results;
