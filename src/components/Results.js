import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AddLocationIcon from '@material-ui/icons/AddLocation'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

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
          <CardHeader action={
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
            {this.props.authenticated && <MenuItem onClick={(e) => {this.handleClose(); this.props.handleClick(e);}} id={this.props.country.id}><AddLocationIcon style={{margin: '0 auto'}}/></MenuItem>}
            <MenuItem onClick={() => {this.handleClose(); this.props.openCountryModal(this.props.country);}}>More Info</MenuItem>
          </Menu>
          <CardMedia component='img' src={this.props.country.flag} alt="" width="400"/>
        </Card>
      )};
}

export default Results;
