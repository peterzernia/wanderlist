import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

class Filter extends Component {

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
      <div style={{ textAlign: 'left' }}>
        <IconButton
          onClick={this.handleClick}
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {/*
          Filter Menu contains a form to filter Trip Reports by country or
          author and another two buttons to filter by the newest and top
          (highest favorite count) Trip Reports. 
          */}
          <MenuItem style={{ background: 'transparent' }} >
            <form onSubmit={(e) => {this.handleClose(); this.props.handleSubmit(e)}}>
              <TextField style={{ maxWidth: 250 }} type='text' name="filter" placeholder="Author or Country"/>
              <Button variant='contained' color='primary' size='small' type='submit'>
                Filter
              </Button>
            </form>
          </MenuItem>
          <MenuItem onClick={() =>  {this.handleClose(); this.props.handleTopClick()}}>Top</MenuItem>
          <MenuItem onClick={() => {this.handleClose(); this.props.handleNewestClick();}}>Newest</MenuItem>
        </Menu>
      </div>
    )
  }
}

export default Filter
