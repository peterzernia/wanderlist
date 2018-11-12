import './static/App.css'
import './static/bootstrap.min.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Layout from './containers/Layout'
import { connect } from 'react-redux'
import { authCheckState } from './actions/authActions'
import { fetchUser } from './actions/userActions'
import { fetchTripReports } from './actions/tripReportActions'

class App extends Component {

  /*
  When the App component is mounted, it checks if a user is authenticated and
  fetches the user data from the Django REST API.
  */
  componentWillMount() {
    this.props.authCheckState();
    this.props.fetchUser();
    this.props.fetchTripReports();
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
    fetchUser: () => dispatch(fetchUser()),
    fetchTripReports: () => dispatch(fetchTripReports())
  }
}

export default connect(mapState, mapDispatch)(App);

App.propTypes = {

};
