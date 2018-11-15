import './static/App.css'
import './static/bootstrap.min.css'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropType from 'prop-types'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Layout from './containers/Layout'
import { connect } from 'react-redux'
import { authCheckState } from './actions/authActions'
import { fetchUser } from './actions/userActions'
import { fetchTripReports, fetchUserTripReports } from './actions/tripReportActions'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

class App extends Component {
  /*
  When the App component is mounted, it checks if a user is authenticated and
  fetches the user data from the Django REST API.
  */
  componentWillMount() {
    this.props.authCheckState();
    this.props.fetchUser();
    this.props.fetchTripReports();
    this.props.fetchUserTripReports(localStorage.getItem('username'));
  }

  render() {

    const theme = createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      overides: {
        CardActions: {
          root: {
            overflow: 'scroll'
          }
        }
      },
      palette: {
        primary: {
          main: '#cBe6c9',
        },
        secondary: {
          main: '#66bb6a',
        }
      }
    });

    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Route path="" component={Layout} {...this.props}>
          </Route>
        </Router>
      </MuiThemeProvider>
    );
  }
}

const mapState = state => {
  return {
  }
}

const mapDispatch = dispatch => {
  return bindActionCreators({
    authCheckState,
    fetchUser,
    fetchTripReports,
    fetchUserTripReports
  }, dispatch);
}

export default connect(mapState, mapDispatch)(App);

App.propTypes = {
  authCheckState: PropType.func,
  fetchUser: PropType.func,
  fetchTripReports: PropType.func,
  fetchUserTripReports: PropType.func
};
