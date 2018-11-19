import React from 'react'
import CountryModal from '../components/CountryModal'
import ReactModal from 'react-modal'
import Close from '@material-ui/icons/Close'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Button from '@material-ui/core/Button'

ReactModal.setAppElement('body');

const TripReportModal = (props) => {

  const listCountries = props.modalPost.countries.map(country =>(
    <Button onClick={() => props.openCountryModal(country)} size='small' key={country.id}>
      {country.name}
    </Button>
  ));

  return (
    <ReactModal isOpen={props.showTripReportModal}>
      <CountryModal {...props} />
      <IconButton style={{ float: 'right' }} onClick={props.closeTripReportModal}>
        <Close />
      </IconButton><br/><br/><br/>
      <Card style={{margin: '0 auto'}}>
        <CardHeader
          action={<IconButton><MoreVertIcon /></IconButton>}
          title={props.modalPost.title}
          subheader={props.modalPost.author.username}
          avatar={<Avatar src={props.modalPost.author.home.flag}/>} />
        <CardContent>
          <Typography component="p">
            {props.modalPost.content}
          </Typography>
        </CardContent>
        <CardActions>
          {listCountries}
        </CardActions>
      </Card>
    </ReactModal>
  )
};

export default TripReportModal;
