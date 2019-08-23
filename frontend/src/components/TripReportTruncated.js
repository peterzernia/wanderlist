import React, { useState } from 'react'
import {
 string, arrayOf, shape, func, number, bool,
} from 'prop-types'
import { Link } from 'react-router-dom'
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'

export default function TripReportTruncated(props) {
  const [isExpanded, setIsExpanded] = useState(false)
  const {
    content,
    countries,
    openCountryModal,
    title,
    author,
    favoriters,
    pk,
    handleClick,
    authenticated,
    id,
    openNotAuthModal,
    openCopyLinkModal,
    slug,
  } = props

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded)
  }

    // Splits content into array of paragraphs.
    const paragraphs = content.split('\n')

    const listCountries = [...countries].sort((a, b) => a.name > b.name).map((country) => (
      <Button onClick={() => openCountryModal(country)} size="small" key={country.id}>
        {country.name}
      </Button>
    ))

  return (
    <Card style={{ margin: '0 auto', width: '90%' }}>
      <CardHeader
        style={{ marginRight: 56 }}
        title={title}
        subheader={(
          <Link href="" style={{ textDecoration: 'none', color: 'gray' }} to={`/u/${author.username}/`}>
            {author.username}
          </Link>
)}
        avatar={<Avatar src={author.home.flag} />}
      />
      <CardContent>
        <Typography component="p">
          {/* Displays first paragraph */}
          {paragraphs[0]}
        </Typography>
      </CardContent>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
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
              content.indexOf('\n') !== -1
              && content.substring(content.indexOf('\n') + 2)
            }
          </Typography>
        </CardContent>
      </Collapse>
      <CardContent>
        <hr />
        {listCountries}
      </CardContent>
      <CardActions style={{ display: 'flex' }} disableSpacing>
        {
          favoriters.includes(pk)
          ? <IconButton onClick={handleClick} id={id}><FavoriteIcon /></IconButton>
          : (
            <IconButton
              onClick={(e) => (authenticated ? handleClick(e) : openNotAuthModal())}
              id={id}
            >
              <FavoriteBorderIcon />
            </IconButton>
)
        }
        <IconButton onClick={() => openCopyLinkModal(slug)}><ShareIcon /></IconButton>
        {/* Button flips when expanded */}
        {
          isExpanded
          ? (
            <IconButton
              style={{ transform: 'rotate(180deg)', float: 'right', marginLeft: 'auto' }}
              onClick={handleExpandClick}
              aria-expanded={isExpanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
)
          : (
            <IconButton
              style={{ float: 'right', marginLeft: 'auto' }}
              onClick={handleExpandClick}
              aria-expanded={isExpanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
)
        }
      </CardActions>
    </Card>
  )
}

TripReportTruncated.propTypes = {
  content: string.isRequired,
  countries: arrayOf(shape({})).isRequired,
  openCountryModal: func.isRequired,
  title: string.isRequired,
  author: shape({}).isRequired,
  favoriters: arrayOf(number).isRequired,
  pk: number,
  handleClick: func.isRequired,
  authenticated: bool.isRequired,
  id: number.isRequired,
  openNotAuthModal: func,
  openCopyLinkModal: func.isRequired,
  slug: string.isRequired,
}

TripReportTruncated.defaultProps = {
  pk: null,
  openNotAuthModal: null,
}
