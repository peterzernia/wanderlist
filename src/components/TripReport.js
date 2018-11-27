import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ShareIcon from '@material-ui/icons/Share'
import Button from '@material-ui/core/Button'

const TripReport = (props) => {

  const listCountries = [...props.countries].sort((a, b) => a.name > b.name).map(country =>(
    <Button onClick={() => props.openCountryModal(country)} size='small' key={country.id}>
      {country.name}
    </Button>
  ));

  return(
    <Card style={{ margin: '0 auto', width: '90%' }}>
      <CardHeader
        style={{ marginRight: 64}}
        title={props.title}
        subheader={props.author.username}
        avatar={<Avatar src={props.author.home.flag}/>} />
      <CardContent>
        <Typography component="p">
          {props.content}
        </Typography><br/>
        <hr/>
        {listCountries}
      </CardContent>
      <CardActions >
        {
          props.favoriters.includes(props.pk)
          ? <IconButton onClick={props.handleClick} id={props.id} ><FavoriteIcon /></IconButton>
          : <IconButton onClick={props.handleClick} id={props.id} ><FavoriteBorderIcon /></IconButton>
        }
        <IconButton onClick={() => {alert(`localhost:3000/p/${props.slug}/`);}}><ShareIcon /></IconButton>
      </CardActions>
    </Card>
  )
};

export default TripReport;
