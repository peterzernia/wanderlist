import React from 'react';
import Discover from './Discover';
import NavBar from '../components/NavBar';
import Search from './Search';
import { Route } from "react-router-dom";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.url)
  }
  render(){
    return(
      <div>
        <NavBar />
        <Route exact path={`${this.props.match.url}`} component={Search}/>
        <Route path={`${this.props.match.url}/discover`} component={Discover}/>
      </div>
    )
  }
}

export default Layout;
