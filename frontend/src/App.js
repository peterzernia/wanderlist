import './App.css'
import './bootstrap.min.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Layout from './containers/Layout'
import { connect } from 'react-redux'
import { authCheckState } from './actions/authActions'
import { fetchUser } from './actions/userActions'

class App extends Component {

  componentDidMount() {
    this.props.authCheckState();
    this.props.fetchUser();
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
    authCheckState: () => dispatch(authCheckState()),
    fetchUser: () => dispatch(fetchUser())
  }
}

export default connect(mapState, mapDispatch)(App);
