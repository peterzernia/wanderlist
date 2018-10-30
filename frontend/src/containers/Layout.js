import React from 'react';
import Discover from './Discover';
import Map from './Map';
import NavBar from '../components/NavBar';
import Profile from './Profile'
import Search from './Search';
import { Route } from "react-router-dom";

class Layout extends React.Component {
  render(){
    return(
      <div>
        <NavBar />
        <Route exact path={`${this.props.match.url}`} component={Search}/>
        <Route path={`${this.props.match.url}/discover`} component={Discover}/>
        <Route path={`${this.props.match.url}/map`} component={Map}/>
        <Route path={`${this.props.match.url}/profile`} component={Profile}/>
      </div>
    )
  }
}

export default Layout;
