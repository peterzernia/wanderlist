import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Layout from './containers/Layout';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="" component={Layout}>
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
