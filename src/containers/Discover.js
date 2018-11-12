import React, { Component } from 'react'
import { connect } from 'react-redux'

class Discover extends Component {
  render(){
    return(
      <div className="content">
        <h1>Discover</h1>
      </div>
    );
  }
}

const mapState = state => {
  return {
  };
}

const mapDispatch = dispatch => {
  return {
  };
}

export default connect(mapState, mapDispatch)(Discover);
