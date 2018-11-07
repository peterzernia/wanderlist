import React, { Component } from 'react'
import { connect } from 'react-redux'

class Map extends Component {
  render(){
    return(
      <div className="content">
        <h1>My Map</h1>
        {this.props.count}<br/>
      </div>
    );
  }
}

const mapState = state => {
  return {
    count: state.user.user.count,
    countries: state.user.user.countries,
    fetched: state.user.fetched
  };
}

const mapDispatch = dispatch => {
  return {
  };
}

export default connect(mapState, mapDispatch)(Map);
