import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Button from '@material-ui/core/Button'


const TripReport = (props) => {

  const listCountries = props.countries.map(country =>(
    <Button onClick={() => props.openCountryModal(country)} size='small' key={country.id}>
      {country.name}
    </Button>
  ));

  return(
    <Card>
      {
        props.author.home
        ? <CardHeader action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={props.title}
            subheader={props.author.username}
            avatar={<Avatar src={props.author.home.flag}/>} />
        : <CardHeader action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title={props.title}
            subheader={props.author.username}
            avatar={<Avatar>{props.author.username.charAt(0)}</Avatar>} />
      }
      <CardContent>
        <Typography component="p">
          {props.content}
        </Typography>
      </CardContent>
      <CardActions>
        {listCountries}
      </CardActions>
    </Card>
  )
};

export default TripReport;
