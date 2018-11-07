import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
    }
  }
  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }
  render() {
    const navClass = this.state.collapsed ? "navbar-collapse collapse" : "navbar-collapse";
    return (
      <nav className="navbar navbar-expand-sm sticky-top navbar-white bg-white">
        <Link to="/" className="btn navbar-brand">Countries</Link>
        <button className="navbar-toggler" type="button" onClick={this.toggleCollapse.bind(this)}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={navClass} id="navbarNavAltMarkup">
          <div className="navbar-nav mr-auto">
            <Link onClick={this.toggleCollapse.bind(this)} className="btn" to="/">Search</Link>
            <Link onClick={this.toggleCollapse.bind(this)} className="btn" to="/discover">Discover</Link>
            <Link onClick={this.toggleCollapse.bind(this)} className="btn" to="/map">My Map</Link>
            <Link onClick={this.toggleCollapse.bind(this)} className="btn" to="/profile">Profile</Link>
          </div>
          <div className="navbar-nav ml-auto">
            {
              !this.props.authenticated ?
              <Link onClick={this.toggleCollapse.bind(this)} className="btn" to="/login">Login</Link> :
              <button className="btn logout" type="button" onClick={this.props.handleClick}>Logout</button>
            }
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;
