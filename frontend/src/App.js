import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Layout from './containers/Layout'
import './App.css'
import { connect } from 'react-redux'
import { authCheckState } from './actions/authActions'

class App extends Component {

  componentDidMount() {
    this.props.authCheckState();
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Route path="" component={Layout} {...this.props}>
          </Route>
        </Router>
      </div>
    );
  }
}

const mapState = state => {
  return {
  }
}

const mapDispatch = dispatch => {
  return {
    authCheckState: () => dispatch(authCheckState())
  }
}

export default connect(mapState, mapDispatch)(App);
