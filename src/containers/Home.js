import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { removeError } from '../actions/errorActions'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { DotLoader } from 'react-spinners'

class Home extends Component {

  componentWillUnmount() {
    this.props.removeError();
  }

  render(){

    return(
      <div >
        <div className='header-img'>
          <Typography variant="h2" gutterBottom style={{ color: 'white', paddingTop: 200 }}>
            Connect, learn and share
          </Typography>
        </div>
        <div className="home-page" style={{ height: 400 }}>
          <h1 style={{ padding: 50 }}>
            "Countries is a slow social media platform, or 'slocial media'. The
            focus of Countries is to encourage users to write thoughtful jouralism
            with an emphasis on photography. We encourage users to slow down and
            spend time creating their Trip Reports. Users can connect with new people
            both across the world and close to home to find inspiration and wonder in
            traveling and the world around us."
          </h1>
        </div>
        <div style={{ height: 400 }}>
          {
            this.props.tripReport
            ? <Card style={{ width: '90%', height: 400, margin: '0 auto'}}>
              <CardContent>
                <div style={{ width: '50%', float: 'left' }}>
                  <img className='homepage-thumbnail' src={[...this.props.tripReport[0].countries].sort((a, b) => a.name > b.name)[0].flag} alt=""/>
                </div>
                <div style={{width: '50%', float: 'right', textAlign: 'center' }}>
                  <Typography variant="h4" gutterBottom>
                    {this.props.tripReport[0].title}
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    by {this.props.tripReport[0].author.username}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {this.props.tripReport[0].content}
                  </Typography>
                </div>
              </CardContent>
            </Card>
            : <DotLoader size={50} color={'#2196f3'} className="content" />
          }
        </div>
        <div style={{ height: 400 }}>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    tripReport: state.tripReport.tripReports.results,
  };
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    removeError
  }, dispatch);
}

export default connect(mapState, mapDispatch)(Home);

Home.propTypes = {
  tripReport: PropTypes.array,
  removeError: PropTypes.func
};
