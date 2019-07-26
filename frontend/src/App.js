import './App.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Layout from './containers/Layout'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

class App extends Component {

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

export default App
