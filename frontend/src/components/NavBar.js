import React from 'react';
import { Link } from 'react-router-dom';


class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-transparent bg-transparent">
      <Link to="/" className="navbar-brand">Countries</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/">Search</Link>
            <Link to="/discover">Discover</Link>
            <Link to="/map">My Map</Link>
            <Link to="/Profile">Profile</Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;
