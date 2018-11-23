import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ShareIcon from '@material-ui/icons/Share'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'

class TripReportTruncated extends Component {

  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {

    // Splits this.props.content into array of paragraphs.
    const paragraphs = this.props.content.split('\n')

    const listCountries = [...this.props.countries].sort((a, b) => a.name > b.name).map(country =>(
      <Button onClick={() => this.props.openCountryModal(country)} size='small' key={country.id}>
        {country.name}
      </Button>
    ));

    return(
      <Card style={{ margin: '0 auto', width: '90%' }}>
        <CardHeader
          action={<IconButton><MoreVertIcon /></IconButton>}
          title={this.props.title}
          subheader={this.props.author.username}
          avatar={<Avatar src={this.props.author.home.flag}/>} />
        <CardContent>
          <Typography component="p">
            {/* Displays first paragraph */}
            {paragraphs[0]}
          </Typography>
        </CardContent>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography component="p">
              {/*
                If indexOf('/n') !== -1 , the index of the first line break does
                not equal zero, which means the content was broken into paragraphs,
                and the content can be shown starting at the second paragraph. If
                the index does === -1, there were no line breaks and the whole
                text is already displayed.
              */}
              {
                this.props.content.indexOf("\n") !== -1
                ? this.props.content.substring(this.props.content.indexOf("\n") + 2)
                : null
              }
            </Typography>
            <hr/>
            {listCountries}
          </CardContent>
        </Collapse>
        <CardActions style={{ display: 'flex' }} disableActionSpacing>
          {
            this.props.favoriters.includes(this.props.pk)
            ? <IconButton onClick={this.props.handleClick} id={this.props.id} ><FavoriteIcon /></IconButton>
            : <IconButton onClick={this.props.handleClick} id={this.props.id} ><FavoriteBorderIcon /></IconButton>
          }
          <IconButton onClick={() => {alert(`localhost:3000/p/${this.props.slug}/`);}}><ShareIcon /></IconButton>
          {/* Button flips when expanded */}
          {
            this.state.expanded
            ? <IconButton
                style={{ transform: 'rotate(180deg)', float: 'right', marginLeft: 'auto' }}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            : <IconButton
                style={{ float: 'right', marginLeft: 'auto' }}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
          }
        </CardActions>
      </Card>
    )
  }
};

export default TripReportTruncated;
