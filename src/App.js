import './App.css' 
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import PropType from 'prop-types'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Layout from './containers/Layout'
import { connect } from 'react-redux'
import { authCheckState } from './actions/authActions'
import { fetchTripReports } from './actions/tripReportActions'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

class App extends Component {
  /*
  When the App component is mounted, it checks if a user is authenticated and
  fetches the user data from the Django REST API.
  */
  componentWillMount() {
    this.props.authCheckState();
    this.props.fetchTripReports(`${process.env.REACT_APP_API_URL}/api/v1/reports/?ordering=-pk`);
  }

  render() {

    // Google Material UI Theme
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
          main: '#2196f3',
        },
        secondary: {
          main: '#000000',
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
    fetchTripReports,
  }, dispatch);
}

export default connect(mapState, mapDispatch)(App);

App.propTypes = {
  authCheckState: PropType.func,
  fetchTripReports: PropType.func,
};
