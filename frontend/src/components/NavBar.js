import React from 'react';
import { Link } from 'react-router-dom';


class NavBar extends React.Component {
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
      <nav className="navbar navbar-fixed-top navbar-transparent bg-transparent">
      <Link to="/" className="btn navbar-brand">Countries</Link>
      <button className="btn" type="button" onClick={this.toggleCollapse.bind(this)}>
        <span className="navbar-toggler-icon"></span>
      </button>
        <div className={navClass} id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link onClick={this.toggleCollapse.bind(this)} to="/">Search</Link>
            <Link onClick={this.toggleCollapse.bind(this)} to="/discover">Discover</Link>
            <Link onClick={this.toggleCollapse.bind(this)} to="/map">My Map</Link>
            <Link onClick={this.toggleCollapse.bind(this)} to="/profile">Profile</Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;
